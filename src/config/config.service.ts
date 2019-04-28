import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    if(filePath && !filePath.includes('undefined')) {
      try {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
      } catch (e) {
        this.envConfig = {};
      }
    }
  }

  get(key: string): string {
    const envValue = this.GetConfigValue(key);
    return envValue;
  }

  protected GetConfigValue(key: string): string {
    Logger.debug(`GET -> ${key}`);
    return process.env && process.env[key] ? process.env[key]
    : this.envConfig && this.envConfig[key] ? this.envConfig[key]
    : '';
  }
}
