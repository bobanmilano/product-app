/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { PrismadbService } from 'src/prismadb/prismadb.service';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {

    constructor(private prismaDbService: PrismadbService) {}

    async editUser(
        userId: number,
        dto: EditUserDto,
      ) {
        const user = await this.prismaDbService.user.update({
          where: {
            id: userId,
          },
          data: {
            ...dto,
          },
        });
    
        delete user.hash;
    
        return user;
      }
}
