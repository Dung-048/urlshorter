import type { TransformFnParams } from 'class-transformer/types/interfaces';

import { sameAs } from './string.utils';

export function toEnumOrNull(enumType: Record<string, unknown>) {
  return (param: TransformFnParams) =>
    Object.keys(enumType).find(sameAs(param.value));
}
