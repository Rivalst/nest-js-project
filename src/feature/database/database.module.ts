import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://hidalgob:3E9FwwchjZKMK3s8@nestjs-project-cluster.poaj4.mongodb.net/?retryWrites=true&w=majority&appName=nestjs-project-cluster',
    ),
  ],
})
export class DatabaseModule {}
