import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	let app;
	const port = +process.env.PORT || 3000;
	if (process.env.NODE_ENV === 'production') {
		app = await NestFactory.create(AppModule, {
			logger: console,
			bodyParser: true
		});
	} else {
		app = await NestFactory.create(AppModule, {
			bodyParser: true
		});
	}

	const options = new DocumentBuilder()
		.setTitle('Twitter backend API')
		.setDescription('Twitter-app backend')
		.setVersion('1.0')
		.addTag('user', 'User model endpoints')
		.addTag('twet', 'Twett model endpoints')
		.addTag('tag', 'Tag model endpoints')
		.setBasePath(process.env.API_PREFIX || 'dev')
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('docs', app, document);

	app.setGlobalPrefix(process.env.API_PREFIX || 'dev');
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors();

	await app.listen(port, () => {
		if (process.env.NODE_ENV !== 'production') {
			Logger.log(`-> Listening on	\x1b[34m http://localhost:${port}/docs\x1b[0m`);
		}
	});
}
bootstrap();
