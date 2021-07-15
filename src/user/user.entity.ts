import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { SliderEntity } from 'src/sliders/slider.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column({ default: 'staf' })
    role: 'admin' | 'staf';

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password)
    }

    // @OneToMany(type => SliderEntity, slider => slider.createdBy)
    // createdSliders: SliderEntity[];

    // @OneToMany(type => SliderEntity, slider => slider.updatedBy)
    // updatedSliders: SliderEntity[];

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updated: Date;
}