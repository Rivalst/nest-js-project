import { DmsController } from './dms.controller';
import { DmsService } from './dms.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/model/user.entity';
@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [DmsController],
  providers: [DmsService],
})
export class DmsModule {}
