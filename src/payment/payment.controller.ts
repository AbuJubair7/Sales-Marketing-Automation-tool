import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { PaymentService } from './payment.service';
import { Request } from 'express';
import { UserRole } from 'user-role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard, RoleGuard)
@Roles(UserRole.MANAGER, UserRole.ADMIN)
@Controller('payment')
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post('plan/PaymentDto')
  async purchasePlan(@Body() data: PaymentDto) {
    return await this.service.purchasePlan(data);
  }
  @Get('get')
  async find(@Req() req: Request) {
    if (req.user) return await this.service.find((req.user as any).email);
  }

  @Patch('update')
  async update(@Body() data: PaymentDto, @Req() req: Request) {
    if (req.user)
      return await this.service.update(data, (req.user as any).email);
  }
}
