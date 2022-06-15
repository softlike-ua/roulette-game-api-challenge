import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AppService } from "./app.service";
import { Request } from "express";
import { BetsInfoDto } from "./bets-info.dto";

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/create")
  create(@Req() request: Request) {
    return this.appService.create(request);
  }

  @Post("/spin")
  spin(@Req() request: Request, @Body() bets: BetsInfoDto) {
    return this.appService.spin(request, bets);
  }

  @Post("/end")
  end(@Req() request: Request) {
    request.session.destroy(null);
    return { message: "session end" };
  }
}
