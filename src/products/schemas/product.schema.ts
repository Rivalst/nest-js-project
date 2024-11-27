import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @ApiProperty({ description: 'title' })
  @Prop()
  title: string;

  @ApiProperty({ description: 'price', example: 99 })
  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
