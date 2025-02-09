import { IsArray, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateBlogDto {
  @IsString()
  @ApiProperty({ example: 'name', description: 'Blog name', required: true })
  name: string;

  @IsString()
  @ApiProperty({ example: 'description', description: 'Blog description', required: true })
  description: string;

  // @IsInt()
  // @ApiProperty({ type: Number, description: 'author id' })
  // authorId: number;

  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) => value.map(Number))
  @ApiProperty({ example: [1, 2], description: 'category ids', required: false, type: [Number] })
  categoryIds?: number[];
}
