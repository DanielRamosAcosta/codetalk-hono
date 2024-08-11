import type { EventBus } from "../../../domain/models/hex/EventBus.ts";
import { DomainEvent } from "../../../domain/events/DomainEvent.ts";

export class EventBusMemory implements EventBus {
  async publish(domainEvents: DomainEvent[]): Promise<void> {
    console.log("TODO: Implement EventBusMemory.publish");
  }
}
