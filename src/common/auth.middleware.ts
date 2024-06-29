import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: any, res: any, next: () => void) {
    const token = req.get('Authorization')?.split('Bearer ')[1];

    console.log('token', token);

    if (token) {
      const user = await this.prismaService.user.findFirst({
        where: {
          token: token,
        },
      });

      console.log('user', user);

      if (user) {
        req.user = user;
      }
    }

    next();
  }
}
