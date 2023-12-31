//import { JwtGuard } from 'src/auth/guard/jwt.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PaymentPlanService } from './paymentPlan.service';
import { PaymentPlanDto } from './dto/paymentPlan.dto';
import { UserRole } from 'user-role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';

@UseGuards(JwtGuard, RoleGuard)
@Roles(UserRole.MANAGER, UserRole.ADMIN)
@Controller('paymentPlan')
export class PaymentPlanController {
  constructor(private readonly service: PaymentPlanService) {}

  @Post('create')
  async create(@Body() data: PaymentPlanDto) {
    await this.service.createPaymentPlan(data);
    return await 'Created successfully!';
  }

  // //@UseGuards(JwtGuard)
  @Get('findall')
  findAll() {
    return this.service.findAll();
  }

  @Put('update/:data/PaymentPlanDto')
  async update(@Param('data') planId: number, @Body() data: PaymentPlanDto) {
    await this.service.updatePlan(planId, data);
    return await 'Updated successfully!';
  }

  // @Get('find')
  // find(@Body() data) {
  //   return this.service.findContact(data);
  // }

  // @Delete('delete/:id')
  // async delete(@Param('id') id: number) {
  //     await this.service.deleteContact(id);
  //     return await 'Deleted successfully!';
  // }

  // @Get('export')
  // async exportToCsv() {
  //     await this.service.exportToCsv();
  //     return await 'Exported successfully!';
  // }
}
