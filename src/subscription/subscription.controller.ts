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
  @Post('CreateSubscriptionDto')
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return await this.subscriptionService.create(createSubscriptionDto);
    //console.log(createSubscriptionDto);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get('all')
  async findAll() {
    return await this.subscriptionService.findAll();
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Get('get/:id')
  async findOne(@Param('id') id: number) {
    return await this.subscriptionService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Roles(UserRole.MANAGER)
  @Patch('update/:id/UpdateSubscriptionDto')
  async update(
    @Param('id') id: number,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return await this.subscriptionService.update(+id, updateSubscriptionDto);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.subscriptionService.remove(+id);
  }
}
