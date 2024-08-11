import { OpenAPIHono } from "@hono/zod-openapi";
import { Container, BindingScopeEnum } from "inversify";
import { RegisterSpeaker } from "./speakers/use-cases/RegisterSpeaker.ts";
import { RegisterSpeakerController } from "./speakers/infrastructure/RegisterSpeakerController.ts";
import type { HonoController } from "./shared/infrastructure/HonoController.ts";
import { ClockFake } from "./shared/infrastructure/services/clock/ClockFake.ts";
import { LoginSpeakerController } from "./speakers/infrastructure/LoginSpeakerController.ts";
import { Token } from "./shared/domain/services/Token.ts";
import { SpeakerRepositoryMemory } from "./speakers/infrastructure/repositories/SpeakerRepositoryMemory.ts";
import { CryptoNode } from "./shared/infrastructure/services/crypto/CryptoNode.ts";
import { EventBusMemory } from "./shared/infrastructure/events/EventBus/EventBusMemory.ts";

export function createContainer() {
  const container = new Container({
    defaultScope: BindingScopeEnum.Singleton,
  });

  container
    .bind(Token.SPEAKER_REPOSITORY)
    .toConstantValue(new SpeakerRepositoryMemory());
  container.bind(Token.CRYPTO).toConstantValue(new CryptoNode());
  container.bind(RegisterSpeaker).toDynamicValue(RegisterSpeaker.create);
  container.bind(Token.CLOCK).toConstantValue(new ClockFake());
  container.bind(Token.EVENT_BUS).toConstantValue(new EventBusMemory());
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

  return container;
}
