import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { plainToClass } from 'class-transformer';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './dto/user-response';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(JwtGuard)
	@Get()
	async findAll() {
		const users = await this.usersService.findAll();
		const response = users.map((user) => plainToClass(UserResponse, user.toJSON()));
		return response;
	}

	@UseGuards(JwtGuard)
	@Get(':id')
	async findOne(@Param('id') id: string) {
		const user = await this.usersService.findById(id);
		const response = plainToClass(UserResponse, user.toJSON());
		return response;
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		const user = await this.usersService.update(id, updateUserDto);
		const response = plainToClass(UserResponse, user.toJSON());
		return response;
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		const user = await this.usersService.remove(id);
		const response = plainToClass(UserResponse, user.toJSON());
		return response;
	}
}
