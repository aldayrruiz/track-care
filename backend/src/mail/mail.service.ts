import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Smartwatch } from 'src/smartwatches/schemas/smartwatch.schema';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService, private userService: UsersService) {}

	async sendTakeOffSmartwatch(smartwatch: Smartwatch, user: User) {
		const emailReceivers = await this.getEmailReceivers();
		await this.mailerService.sendMail({
			bcc: emailReceivers,
			subject: 'Se ha reportado una retirada de pulsera',
			template: './takeOffSmart',
			context: {
				mac: smartwatch.MAC,
				userName: user.name,
			},
		});
	}

	async sendEmergencySmartwatch(smartwatch: Smartwatch, user: User) {
		const emailReceivers = await this.getEmailReceivers();
		await this.mailerService.sendMail({
			bcc: emailReceivers,
			subject: 'Se ha reportado una emergencia de pulsera',
			template: './emergencySmart',
			context: {
				mac: smartwatch.MAC,
				userName: user.name,
			},
		});
	}

	private async getEmailReceivers() {
		const users = await this.userService.findAll();
		const emailReceivers = users.filter((user) => user.emailReceiver).map((user) => user.email);
		return emailReceivers;
	}
}
