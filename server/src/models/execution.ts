import { Lab } from './lab';
import { AbstractValidationError } from '../validation/validation-result';
import { HardwareType } from './server';

export enum ExecutionStatus {
  Pristine = 'pristine',
  Executing = 'executing',
  Finished = 'finished',
  Stopped = 'stopped',
  Failed = 'failed'
}

export interface Execution {
  id: string;
  cache_hash: string;
  started_at: number;
  finished_at: number;
  server_info: string;
  hardware_type: HardwareType;
  user_id: string;
  lab: Lab;
  status: ExecutionStatus;
}

export enum MessageKind {
  Stdout = 'stdout',
  Stderr = 'stderr',
  ExecutionStarted = 'started',
  ExecutionFinished = 'finished',
  ExecutionRejected = 'rejected'
}

export interface ExecutionMessage {
  id?: string;
  index?: number;
  data: string | ExecutionRejectionInfo;
  kind: MessageKind;
  timestamp?: number | object;
}

export enum ExecutionRejectionReason {
  NoAnonymous,
  NoPlan,
  InvalidConfig,
  OutOfCredits,
  ExceedsMaximumConcurrency,
  OverCapacity
}

export class ExecutionRejectionInfo extends AbstractValidationError {
  constructor(public reason: ExecutionRejectionReason,
              public message: string) {
                super(message);
              }
}

export function toMessageKind(kind: string) {
  return kind.toLowerCase() === 'stderr' ? MessageKind.Stderr : MessageKind.Stdout;
}