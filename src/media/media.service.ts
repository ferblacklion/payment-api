import { Injectable } from '@nestjs/common';
import { StorageService } from '../services/google/storage.service';

import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediaService {
  constructor(private storageService: StorageService) {}
  create(createMediaDto: CreateMediaDto) {
    return this.storageService.create(createMediaDto);
  }

  findAll() {
    this.storageService.findAll();
    return `This action returns all media`;
  }

  findOne(id: number) {
    return `This action returns a #${id} media`;
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
