import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Roles } from 'src/decorators/role.decorator';
import { UserRole } from 'user-role.enum';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(UserRole.MANAGER)
  @Post('/CreateSubscriptionDto')
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll() {
    return this.subscriptionService.findAll();
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.subscriptionService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Roles(UserRole.MANAGER)
  @Patch(':id/UpdateSubscriptionDto')
  async update(
    @Param('id') id: number,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionService.update(+id, updateSubscriptionDto);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.subscriptionService.remove(+id);
  }
}
