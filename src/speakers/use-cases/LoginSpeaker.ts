import type { interfaces } from "inversify";

export class LoginSpeaker {
  public static create({ container }: interfaces.Context) {
    return new LoginSpeaker();
  }

  async execute() {
    console.log("login speaker");
  }
}
