import { IsString, IsUrl } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { Photo } from 'src/photo/entities/photo.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsUrl(undefined, { message: 'Avatar must be a valid URL' })
  avatar: string;

  @Column({ default: '' })
  @IsString()
  fullName: string;

  @Column({ type: 'varchar', array: true, default: null })
  photos: number[];

  @ManyToOne(() => User, (user) => user.clients)
  user: User;
}
