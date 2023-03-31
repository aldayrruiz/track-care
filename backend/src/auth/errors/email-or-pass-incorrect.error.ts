import { BadRequestException } from '@nestjs/common';

export class EmailOrPasswordIncorrect extends BadRequestException {
	constructor() {
		super('Email o contraseña incorrectos');
	}
}
