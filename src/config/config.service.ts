import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    if(filePath) {
      this.envConfig = dotenv.parse(fs.readFileSync(filePath));
      Logger.debug(`App used -> ${process.env.NODE_ENV}.ENV`);
    } else {
      Logger.debug('App used -> process.env');
    }
  }

  get(key: string): string {
    const envValue = process.env[key] || this.envConfig[key];
    Logger.debug(`GET -> ${key}: ${envValue}`);
    return envValue;
  }
}