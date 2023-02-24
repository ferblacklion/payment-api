import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateMediaDto } from 'src/media/dto/create-media.dto';
import { initFirebase } from './initFirebase';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class StorageService {
  private bucket: Bucket = null;
  constructor(private configService: ConfigService) {
    const app = initFirebase(this.configService);
    this.bucket = app.storage().bucket();
  }
  findAll() {
    return [];
  }
  findOne() {
    return null;
  }
  async create(createMediaDto: CreateMediaDto): Promise<string> {
    try {
      const file = await this.bucket.file(
        `family-payments-invoice/${createMediaDto.fileName}`,
      );

      await file.save(createMediaDto.buffer);
      file.makePublic();
      return file.publicUrl();
    } catch (error) {
      throw error;
    }
  }
}
