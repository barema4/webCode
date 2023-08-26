import { IsUrl } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Photo } from 'src/photo/entities/photo.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsUrl(undefined, { message: 'Avatar must be a valid URL' })
  avatar: string;

  @OneToMany(() => Photo, (photo) => photo.client) // Define the one-to-many relationship
  photos: Photo[];

  @ManyToOne(() => User, (user) => user.clients)
  user: User;
}
