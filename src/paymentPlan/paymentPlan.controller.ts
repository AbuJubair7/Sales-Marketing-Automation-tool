//import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Body, Controller, Post } from "@nestjs/common";
import { PaymentPlanService } from "./paymentPlan.service";
import { PaymentPlanDto } from "./dto/paymentPlan.dto"

@Controller('paymentPlan')
export class PaymentPlanController {
  constructor(private readonly service: PaymentPlanService) {}

  @Post('create')
  async create(@Body() data: PaymentPlanDto) {
    await this.service.createPaymentPlan(data);
    return await 'Created successfully!';
  }

  // @Get('find')
  // find(@Body() data) {
  //   return this.service.findContact(data);
  // }

  // //@UseGuards(JwtGuard)
  // @Get('findall')
  // findAll() {
  //     return this.service.findAll();
  // }

  // @Put('update/:data/ContactDto')
  // async update(@Param('data') id: number, @Body() data: ContactDto) {
  //     await this.service.updateContact(id, data);
  //     return await 'Updated successfully!';
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
