import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  let app;
  const port = +process.env.PORT || 3000;
  if ( process.env.NODE_ENV === 'production' ) {
      app = await NestFactory.create(AppModule, {
      logger: console,
      bodyParser: true,
    });
  } else {
      app = await NestFactory.create(AppModule, {
      bodyParser: true,
    });
  }
  app.setGlobalPrefix('v1');
  await app.listen(port, () => {
    if (process.env.NODE_ENV !== 'production') {
      Logger.log(`-> Listening on	\x1b[34m http://localhost:${ port }\x1b[0m`);
    }
  });
}
bootstrap();
