import { IsArray, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({ type: [Number], description: 'category ids' })
  categoryIds?: number[];
}
