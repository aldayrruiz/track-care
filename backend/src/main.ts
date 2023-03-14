import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocumentBuilder } from './swagger/builder';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const swaggerBuilder = new SwaggerDocumentBuilder(app);
	swaggerBuilder.build();
	await app.listen(3000);
}
bootstrap();
