import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    let config;
    if(filePath && !filePath.includes('undefined')) {
      fs.exists(filePath, () => {
        config = dotenv.parse(fs.readFileSync(filePath));
      });
      this.envConfig = config || {};
    }
  }

  get(key: string): string {
    const envValue = this.GetConfigValue(key);
    return envValue;
  }

  protected GetConfigValue(key: string): string {
    return process.env ?
    process.env[key] :
    this.envConfig ? this.envConfig[key] : null;
  }
}