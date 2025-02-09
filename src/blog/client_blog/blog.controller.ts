import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { BlogService } from './blog.service';
import { FindAllBlogQueryDto } from './dto/find-all-blog-query.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { MAX_FILE_SIZE } from '../../common/constant';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('blogs')
@ApiTags('Blogs')
@UseGuards(AuthGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll(@Query() dto: FindAllBlogQueryDto) {
    return this.blogService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.blogService.findOne(Number(id));
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() dto: CreateBlogDto,
    @CurrentUser() user: any,
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
  ) {
    return this.blogService.create(dto, user.userId, file);
  }

  @Patch()
  async update(@Body() dto: UpdateBlogDto, @CurrentUser() user: any) {
    return this.blogService.update(dto, user.userId);
  }

  @Delete('id')
  async remove(@Param('id') id: number, @CurrentUser() user: any) {
    return this.blogService.remove(id, user.userId);
  }
}
