import { DomainEvent } from "./DomainEvent.ts";

export abstract class DomainEventSubscriber<T extends DomainEvent> {
  public static isInstance(
    instance: unknown
  ): instance is DomainEventSubscriber<DomainEvent> {
    return instance instanceof DomainEventSubscriber;
  }

  abstract on(domainEvent: T): Promise<void>;
}
