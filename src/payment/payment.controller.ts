import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
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

  @Post('transaction')
  async purchasePlan(@Body() plan: any, @Req() req: Request) {
    // console.log(plan.paymentPlan);
    // console.log((req.user as any).email);

    if (req.user) {
      return await this.service.purchasePlan({
        email: (req.user as any).email,
        paymentPlan: plan.paymentPlan,
      });
    }
    throw new UnauthorizedException('Internal server error!');
  }
  @Get('get')
  async find(@Req() req: Request) {
    if (req.user) return await this.service.find((req.user as any).email);
    throw new UnauthorizedException('Sign in again!');
  }

  @Patch('update')
  async update(@Body() data: string, @Req() req: Request) {
    if (req.user)
      return await this.service.update(data, (req.user as any).email);
  }
}
