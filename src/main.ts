import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform:true}));
  app.use(session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false
  }));

  await app.listen(3000);
}

bootstrap();
