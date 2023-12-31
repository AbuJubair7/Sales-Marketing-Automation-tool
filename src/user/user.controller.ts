import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import { Roles } from 'src/decorators/role.decorator';
import { UserRole } from 'user-role.enum';
import { RoleGuard } from 'src/auth/guard/role.guard';

@UseGuards(JwtGuard, RoleGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  @Get('all')
  async findAll(@Req() req: Request) {
    if (req.user) return await this.userService.findAll();
    throw new NotFoundException('Not found!');
  }

  @Roles(
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.EMPLOYEE,
    UserRole.SALER,
    UserRole.MARKETER,
  )
  @Get('get')
  async findOne(@Req() req: Request) {
    if (req.user) return await this.userService.findOne((req.user as any).id);
    throw new NotFoundException('Not found!');
  }

  @Roles(
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.EMPLOYEE,
    UserRole.SALER,
    UserRole.MARKETER,
  )
  @Patch('update/UpdateUserDto')
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    if (req.user)
      return await this.userService.update((req.user as any).id, updateUserDto);
    throw new UnauthorizedException('You are not allowed to do the operation!');
  }

  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  @Delete('delete')
  async remove(@Req() req: Request) {
    if (req.user) return await this.userService.remove((req.user as any).id);
    throw new UnauthorizedException('You are not allowed to do the operation!');
  }
}
