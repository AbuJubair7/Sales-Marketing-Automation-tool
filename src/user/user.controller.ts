import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll(@Req() req: Request) {
    if (req.user) return await this.userService.findAll();
    throw new NotFoundException('Not found!');
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req: Request) {
    if (req.user) return await this.userService.findOne(id);
    throw new NotFoundException('Not found!');
  }

  @UseGuards(JwtGuard)
  @Patch(':id/UpdateUserDto')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    if (req.user) return await this.userService.update(+id, updateUserDto);
    throw new UnauthorizedException('You are not allowed to do the operation!');
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req: Request) {
    if (req.user) return await this.userService.remove(id);
    throw new UnauthorizedException('You are not allowed to do the operation!');
  }
}
