import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogMediaDto {
  @IsString()
  @ApiProperty({ type: String, description: 'media name' })
  name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'media url' })
  url: string;

  @IsString()
  @ApiProperty({ type: String, description: 'media key' })
  key: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'blog id' })
  blogId: number;
}
