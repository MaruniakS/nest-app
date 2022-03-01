import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
import { Connection, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { Subitem } from './entities/subitem.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Subitem)
    private readonly subitemRepository: Repository<Subitem>,
    private readonly connection: Connection,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.itemRepository.find({
      relations: ['subitems'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const item = await this.itemRepository.findOne(id, {
      relations: ['subitems'],
    });
    if (!item) {
      throw new NotFoundException(`Item #${id} was not found`);
    }
    return item;
  }

  async create(createItemDto: CreateItemDto) {
    const subitems = await Promise.all(
      createItemDto.subitems.map((name) => this.preloadSubitemByName(name)),
    );
    const item = this.itemRepository.create({ ...createItemDto, subitems });
    return this.itemRepository.save(item);
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const subitems =
      updateItemDto.subitems &&
      (await Promise.all(
        updateItemDto.subitems.map((name) => this.preloadSubitemByName(name)),
      ));

    const item = await this.itemRepository.preload({
      id: +id,
      ...updateItemDto,
      subitems,
    });

    if (!item) {
      throw new NotFoundException(`Item #${id} was not found`);
    }

    return this.itemRepository.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    return this.itemRepository.remove(item);
  }

  async recommendItem(item: Item) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      item.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_item';
      recommendEvent.type = 'item';
      recommendEvent.payload = { itemId: item.id };

      await queryRunner.manager.save(item);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadSubitemByName(name: string): Promise<Subitem> {
    const existingSubitem = await this.subitemRepository.findOne({ name });
    if (existingSubitem) return existingSubitem;
    return this.subitemRepository.create({ name });
  }
}
