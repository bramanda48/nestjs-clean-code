export interface IMapper<Entity, Model> {
    toEntity(param: Model): Entity;
    toModel(param: Entity): Model;
}
