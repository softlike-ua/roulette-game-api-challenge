import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { BetsInfoDto } from "./bets-info.dto";

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {
  }

  getHello(): string {
    console.log(process.env.TEST);
    return "Hello World!";
  }

  async create(request) {
    try {
      const user = {
        balance: 1000
      };
      request.session.user = this.jwtService.sign(user);
      return { message: "Init success" };
    } catch (e) {

    }
  }

  async spin(request, bets: BetsInfoDto) {
    try {
      if (!request.session.user) {
        return { message: "Init session" };
      }

      if (!this.checkBalance(request, bets)) {
        return { message: "Not enough money" };
      }
      const winNumber: number = AppService.generateNumber();
      // console.log("winNumber", winNumber);

      const checkBets = AppService.checkBets(winNumber, bets);
      // console.log("win", checkBets.sum);

      let user = this.jwtService.decode(request.session.user);
      user["balance"] += checkBets.sum;
      // console.log(user);

      request.session.user = this.jwtService.sign(user);
      return { balance: user["balance"], result: checkBets };
    } catch (e) {
      return { message: "Server error" };
    }
  }

  async end(req) {
    req.session.user = "";
  }

  private getBalance(req) {
    let hashUser = req.session.user;
    if (!hashUser) {
      console.log("no session");//for test
      return false;
    }
    return this.jwtService.decode(hashUser);
  }

  private checkBalance(req, bets: BetsInfoDto): boolean {

    const totalAmount = bets.betsInfo.reduce((acc, curr) => acc + curr.betAmount, 0);
    const user = this.getBalance(req);
    return (user["balance"] >= totalAmount);
  }

  private static generateNumber(): number {
    let num = Math.floor(Math.random() * 37);
    console.log("win numb", num);
    return num;
  }

  private static checkBets(winNumber: number, bets: BetsInfoDto) {
    let won = 0;
    let result = [];
    let totalBets = bets.betsInfo.reduce((acc, current) => acc + current.betAmount, 0);
    bets.betsInfo.map(item => {
      if (parseInt(item.betType) === winNumber) {
        console.log("WIN");
        let currentWin = item.betAmount * 36;
        won += currentWin;
        result.push({ bet: item, win: currentWin });
      }
      if (item.betType === "even" && winNumber % 2 === 0 && winNumber !== 0) {
        console.log("even");
        let currentWin = item.betAmount * 2;
        won += currentWin;
        result.push({ bet: item, win: currentWin });
      }
      if (item.betType === "odd" && winNumber % 2 !== 0 && winNumber !== 0) {
        console.log("odd");
        let currentWin = item.betAmount * 2;
        won += currentWin;
        result.push({ bet: item, win: currentWin });
      }
    });

    console.log("----------------");
    console.log("totalBets", totalBets);
    console.log("won", won);
    console.log("total", won - totalBets);

    return { bets: result, sum: won - totalBets };
  }
}
