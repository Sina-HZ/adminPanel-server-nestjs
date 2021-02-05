import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';

@Entity('file')
export class FileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    originalname: string

    @Column()
    mimetype: string
    
    @Column()
    destination: string
    
    @Column()
    filename: string;
    
    @Column()
    path: string;

    @Column()
    size: number;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updated: Date;

    @Column({type: "timestamp", nullable: true})
    removedAt: Date
}