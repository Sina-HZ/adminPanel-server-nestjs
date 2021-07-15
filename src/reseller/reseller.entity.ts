import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('reseller')
export class ResellerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    province: string;

    @Column()
    city: string;

    @Column('text',{array: true})
    phone: string[];

    @Column()
    address: string
}