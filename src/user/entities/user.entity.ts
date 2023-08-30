import { IsString, Length, Matches } from 'class-validator';
import { Client } from '../../client/entities/client.entity';
import { Photo } from '../../photo/entities/photo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  @IsString()
  @Length(2, 25)
  firstName: string;

  @Column()
  @IsString()
  @Length(2, 25)
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Length(6, 50)
  @Matches(/^(?=.*\d).+$/, {
    message: 'Password must contain at least one number',
  })
  password: string;

  @Column()
  @IsString()
  role: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
