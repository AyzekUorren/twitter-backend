import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = +process.env.PORT || 3000;
  const apiPrefix = process.env.API_PREFIX || 'dev';
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  app.setGlobalPrefix(apiPrefix);
  await app.listen(port, () => {
    Logger.log(`-> Listening on	\x1b[34m http://localhost:${ port }/${ apiPrefix }\x1b[0m`);
    // console.log(`-> Api docs on	\x1b[32m http://${ host }:${ port }/api/v1/docs\x1b[0m`);
  });
}
bootstrap();
