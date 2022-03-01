import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Subitem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Item, (item) => item.subitems)
  items: Item[];
}
