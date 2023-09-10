import { Controller, Post, Body } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }
}
