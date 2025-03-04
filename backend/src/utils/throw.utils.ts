import { BadRequestException, NotFoundException } from '@nestjs/common';

export function notNullOr404<T>(value: T | null, message: string): T {
  if (value === null) {
    throw new NotFoundException(message);
  }

  return value;
}

export function notNullOr400<T>(value: T | null, message: string): T {
  if (value === null) {
    throw new BadRequestException(message);
  }

  return value;
}

export async function isNoError<T>(action: Promise<T>): Promise<boolean> {
  try {
    await action;

    return true;
  } catch {
    return false;
  }
}
