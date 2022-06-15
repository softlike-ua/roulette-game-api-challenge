import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({useFactory: () => ({secret: process.env.JWT_KEY})}),
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {
}
