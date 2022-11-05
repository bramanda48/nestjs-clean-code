import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ name: 'sort_id', generated: 'increment', unique: true, zerofill: true })
    sortId?: number;
}