import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Subitem } from './entities/subitem.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  imports: [TypeOrmModule.forFeature([Item, Subitem, Event])],
})
export class ItemsModule {}
