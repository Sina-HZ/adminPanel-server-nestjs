import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';
import { FileEntity } from 'src/file/file.entity';

@Entity('slider')
export class SliderEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToOne(type => FileEntity)
    @JoinColumn()
    image: FileEntity;

    @Column({default: 'deactive'})
    status: 'deactive' | 'active';

    @ManyToOne(type => UserEntity, user => user.createdSliders)
    @JoinColumn()
    createdBy: UserEntity;

    @ManyToOne(type => UserEntity, user => user.updatedSliders)
    updatedBy: UserEntity;

    @Column({ type: "timestamp", nullable: true })
    removedAt: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updated: Date;
}