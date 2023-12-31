import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(data: any) {
    const val = parseInt(data);
    if (Number.isInteger(val)) {
      return await this.userRepo.findOne({
        where: { id: parseInt(data) },
      });
    }
    const user = await this.userRepo.findOne({ where: { email: data } });
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found!');
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const user = await this.userRepo.update(+id, updateUserDto);
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found!');
  }

  async remove(id: number) {
    return await this.userRepo.delete(+id);
  }
}
