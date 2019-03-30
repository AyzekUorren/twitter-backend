import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = +process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  app.setGlobalPrefix('v1');
  await app.listen(port, () => {
    console.log(`-> Listening on	\x1b[34m http://localhost:${ port }\x1b[0m`);
    // console.log(`-> Api docs on	\x1b[32m http://${ host }:${ port }/api/v1/docs\x1b[0m`);
  });
}
bootstrap();
