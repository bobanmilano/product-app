import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth. module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PrismadbModule } from './prismadb/prismadb.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    PrismadbModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
