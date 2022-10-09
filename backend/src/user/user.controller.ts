/* eslint-disable */
import { Body, Controller, Get, Patch,Req, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Get('current')
    getCurrentUser(@GetUser() user: User) {
      console.log("CURRENT USER");
      console.log(user);
        return user;
    }
 
    @Patch()
    editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto,
    ) {
      return this.userService.editUser(userId, dto);
    }
}