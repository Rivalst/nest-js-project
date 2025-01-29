import { IsArray, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateBlogDto {
  @IsString()
  @ApiProperty({ type: String, description: 'blog name' })
  name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'blog description' })
  description: string;

  // @IsInt()
  // @ApiProperty({ type: Number, description: 'author id' })
  // authorId: number;

  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) => value.map(Number))
  @ApiProperty({ type: [Number], description: 'category ids' })
  categoryIds?: number[];
}
