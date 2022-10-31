import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateTodoDto {
    @ApiProperty({ example: 'title todo' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' })
    @IsString()
    content: string;
}

export class GetTodoDto {
    @IsUUID()
    id: string;
}

export class DeleteTodoDto {
    @IsUUID()
    id: string;
}