import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DmsService } from './dms.service';
import { AuthGuard } from '../auth/auth.guard';
import { MAX_FILE_SIZE } from '../common/constant';
import { RolesGuard } from '../user/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesEnum } from '../roles/roles.enum';

@Controller('dms')
@Roles(RolesEnum.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
export class DmsController {
  constructor(private readonly dmsService: DmsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({
            maxSize: MAX_FILE_SIZE,
            message: 'File is too large. Max file size is 10MB',
          }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Body('isPublic') isPublic: string,
  ) {
    const isPublicBool = isPublic === 'true';
    return this.dmsService.uploadSingleFile({ file, isPublic: isPublicBool });
  }

  @Get('/signed-url/:key')
  async getSingedUrl(@Param('key') key: string) {
    return this.dmsService.getPresignedSignedUrl(key);
  }

  @Get(':key')
  async getFileUrl(@Param('key') key: string) {
    return this.dmsService.getFileUrl(key);
  }

  @Delete(':key')
  async deleteFile(@Param('key') key: string) {
    return this.dmsService.deleteFile(key);
  }
}
