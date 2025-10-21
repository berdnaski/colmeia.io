import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './modules/customers/customers.module';
import { ChargesModule } from './modules/charges/charges.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomersModule,
    ChargesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
