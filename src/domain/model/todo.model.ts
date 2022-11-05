export class TodoModel {
    id?: string;
    title: string;
    content: string;
    dateCreated?: Date;
    dateUpdated?: Date;
    dateDeleted?: Date;
}

export class TodoModelDeleted {
    deleted: boolean;
}
