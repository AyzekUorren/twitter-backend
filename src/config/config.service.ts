import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    var keyValue = process.env[key] || this.envConfig[key];
    Logger.debug(`GET -> ${key}: ${keyValue}`);
    return keyValue;
  }
}