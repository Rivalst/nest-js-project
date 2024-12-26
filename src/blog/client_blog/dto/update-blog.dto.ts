import { IsArray, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogDto {
  @IsInt()
  @ApiProperty({ type: Number, description: 'blog id' })
  id: number;

  @IsString()
  @ApiProperty({ type: String, description: 'blog name' })
  name?: string;

  @IsString()
  @ApiProperty({ type: String, description: 'blog description' })
  description?: string;

  @IsArray()
  @IsInt({ each: true })
  @ApiProperty({ type: [Number], description: 'category ids' })
  categoryIds?: number[];
}
