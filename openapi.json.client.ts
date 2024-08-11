import { z } from "zod";

const DateRangeDTO = z
  .object({
    startDate: z.string().datetime({ offset: true }),
    endDate: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ProposalDateRangeDTO = z
  .object({
    startDate: z.string().datetime({ offset: true }),
    deadline: z.string().datetime({ offset: true }),
  })
  .passthrough();
const CreateEventRequestDTO = z
  .object({
    id: z.string(),
    name: z.string(),
    dateRange: DateRangeDTO,
    proposalsDateRange: ProposalDateRangeDTO,
  })
  .passthrough();
const CreateSpeakerRequestDTO = z
  .object({
    id: z.string(),
    name: z.string(),
    age: z.number(),
    language: z.enum(["SPANISH", "ENGLISH"]),
    email: z.string(),
  })
  .passthrough();
const CreateTalkRequestDTO = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    language: z.enum(["SPANISH", "ENGLISH"]),
    cospeakers: z.array(z.string()),
    speakerId: z.string(),
    eventId: z.string(),
  })
  .passthrough();
const ReviewTalkRequestDTO = z.object({ reviewerId: z.string() }).passthrough();

export const schemas = {
  DateRangeDTO,
  ProposalDateRangeDTO,
  CreateEventRequestDTO,
  CreateSpeakerRequestDTO,
  CreateTalkRequestDTO,
  ReviewTalkRequestDTO,
};
