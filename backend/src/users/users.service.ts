import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async create(userDto: RegisterDto): Promise<User> {
		const createdUser = new this.userModel(userDto);
		return createdUser.save();
	}

	async findAll(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	async findOne(id: string): Promise<User> {
		return this.userModel.findById(id).exec();
	}

	async findByEmail(email: string): Promise<User> {
		return this.userModel.findOne({ email }).exec();
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
	}

	async remove(id: string): Promise<User> {
		return this.userModel.findByIdAndRemove(id).exec();
	}
}
