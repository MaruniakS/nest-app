import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  private items: Item[] = [
    {
      id: 1,
      name: 'First item',
      subitems: ['sub1', 'sub2'],
    },
  ];

  findAll() {
    return this.items;
  }

  findOne(id: string) {
    const item = this.items.find((item) => item.id === +id);
    if (!item) {
      throw new NotFoundException(`Item #${id} was not found`);
    }
    return item;
  }

  create(createItemDto: any) {
    this.items.push(createItemDto);
  }

  update(id: string, updateItemDto: any) {
    const existingItem = this.findOne(id);
    if (existingItem) {
    }
  }

  remove(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id === +id);
    if (itemIndex) {
      this.items.splice(itemIndex, 1);
    }
  }
}
