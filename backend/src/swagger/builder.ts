import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerDocumentBuilder {
  private app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
  }

  public build() {
    const config = this.getConfig();
    const document = this.createDocument(config);
    this.setup(document);
  }

  private getConfig() {
    const config = new DocumentBuilder()
      .setTitle('BLUE Watch')
      .setDescription('BLUE Watch API description')
      .setVersion('1.0')
      .build();
    return config;
  }

  private createDocument(config) {
    const document = SwaggerModule.createDocument(this.app, config);
    return document;
  }

  private setup(document) {
    SwaggerModule.setup('api/docs', this.app, document);
  }
}
