import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subitem } from './subitem.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @ManyToMany(() => Subitem, (subitem) => subitem.items, {
    cascade: true,
  })
  subitems: Subitem[];
}
