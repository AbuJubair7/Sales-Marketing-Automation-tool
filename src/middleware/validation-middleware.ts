import { Injectable, NestMiddleware } from '@nestjs/common';
import { plainToClassFromExist } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { ContactDto } from 'src/contact/dto/contact.dto';
import { CreateSubscriptionDto } from 'src/subscription/dto/create-subscription.dto';
import { UpdateSubscriptionDto } from 'src/subscription/dto/update-subscription.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const pathSegments = req.path.split('/').filter(Boolean);
    const dtoData = pathSegments.pop();
    // console.log('Inside middleware: ' + dtoData);

    const dtoClasses: Record<string, any> = {
      CreateAuthDto,
      CreateUserDto,
      UpdateAuthDto,
      UpdateUserDto,
      ContactDto,
      CreateSubscriptionDto,
      UpdateSubscriptionDto,
    };

    const selectedDto = dtoClasses[dtoData];

    if (!selectedDto) return next();

    const dtoInstance = plainToClassFromExist(new selectedDto(), req.body);

    validate(dtoInstance).then((error) => {
      if (error.length > 0) {
        const errorMessage = error
          .map((error) => Object.values(error.constraints))
          .join(', ');
        return res.status(400).json({ message: errorMessage });
      }
      next();
    });
  }
}
