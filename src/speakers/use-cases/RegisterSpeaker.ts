import type { interfaces } from "inversify";

export class RegisterSpeaker {
  public static create({ container }: interfaces.Context) {
    return new RegisterSpeaker();
  }

  async execute() {
    console.log("registering speaker");
  }
}
