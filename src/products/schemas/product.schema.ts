import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProductDocument = Product & Document;

@Schema()
export class Product extends Document {
  @ApiProperty({ description: 'Title of the product' })
  @Prop()
  title: string;

  @ApiProperty({ description: 'Price of the product', example: 99 })
  @Prop()
  price: number;

  @ApiProperty({
    description: 'ID of the product',
    example: '6741e320f3e963ecb6dd62ba',
  })
  id: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
