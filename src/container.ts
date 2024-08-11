import { OpenAPIHono } from "@hono/zod-openapi";
import { Container, BindingScopeEnum } from "inversify";
import { RegisterSpeaker } from "./speakers/use-cases/RegisterSpeaker.ts";
import { RegisterSpeakerController } from "./speakers/infrastructure/RegisterSpeakerController.ts";
import type { HonoController } from "./shared/infrastructure/HonoController.ts";
import { ClockFake } from "./shared/infrastructure/services/clock/ClockFake.ts";
import { LoginSpeakerController } from "./speakers/infrastructure/LoginSpeakerController.ts";

export const container = new Container({
  defaultScope: BindingScopeEnum.Singleton,
});

container.bind(RegisterSpeaker).toDynamicValue(RegisterSpeaker.create);
container.bind("Clock").toConstantValue(new ClockFake());
container.bind("Controller").toDynamicValue(RegisterSpeakerController.create);
container.bind("Controller").toDynamicValue(LoginSpeakerController.create);
container.bind("Hono").toConstantValue(new OpenAPIHono());
container.bind("App").toDynamicValue((context) => {
  const api = context.container.get<OpenAPIHono>("Hono");
  const controllers = context.container.getAll<HonoController>("Controller");

  for (const controller of controllers) {
    controller.register(api);
  }

  return api;
});
