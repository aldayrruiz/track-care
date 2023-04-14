import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocumentBuilder } from './swagger/builder';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ValidationPipe({ enableDebugMessages: true }));
	app.enableCors();
	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector), { excludePrefixes: ['__'] })
	);
	const swaggerBuilder = new SwaggerDocumentBuilder(app);
	swaggerBuilder.build();
	await app.listen(3000);
}
bootstrap();
