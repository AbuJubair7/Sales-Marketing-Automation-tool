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
import { Roles } from 'src/decorators/role.decorator';
import { UserRole } from 'user-role.enum';
import { RoleGuard } from 'src/auth/guard/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  @Get('all')
  async findAll(@Req() req: Request) {
    if (req.user) return await this.userService.findAll();
    throw new NotFoundException('Not found!');
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.EMPLOYEE,
    UserRole.SALER,
    UserRole.MARKETER,
  )
  @Get('get/:id')
  async findOne(@Param('id') id: number, @Req() req: Request) {
    if (req.user) return await this.userService.findOne(id);
    throw new NotFoundException('Not found!');
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.EMPLOYEE,
    UserRole.SALER,
    UserRole.MARKETER,
  )
  @Patch('update/:id/UpdateUserDto')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    if (req.user) return await this.userService.update(+id, updateUserDto);
    throw new UnauthorizedException('You are not allowed to do the operation!');
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  @Delete('delete/:id')
  async remove(@Param('id') id: number, @Req() req: Request) {
    if (req.user) return await this.userService.remove(id);
    throw new UnauthorizedException('You are not allowed to do the operation!');
  }
}
