import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'todo' })
export class TodoEntity extends BaseEntity {
    @Column('varchar')
    title: string;

    @Column('text')
    content: string;

    @CreateDateColumn({ name: 'date_created' })
    dateCreated?: Date;

    @UpdateDateColumn({ name: 'date_updated' })
    dateUpdated?: Date;

    @DeleteDateColumn({ name: 'date_deleted' })
    dateDeleted?: Date;
}