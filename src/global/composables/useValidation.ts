import { z, ZodType } from 'zod';
import { get, groupBy, throttle } from 'lodash-es';

export function useValidation<T extends ZodType>(
  schema: T,
  formData: MaybeRefOrGetter<Record<string, unknown>>,
) {
  const isValid = ref(false);
  const errors = ref<Record<string, z.ZodIssue[]> | null>(null);
  const throttledValidation = throttle(validate, 500);
  let stopWatch: null | (() => void) = null;

  function clearErrors(): void {
    errors.value = null;
  }

  function validationWatch() {
    if (stopWatch !== null) {
      return;
    }

    stopWatch = watch(
      () => toValue(formData),
      async () => {
        await throttledValidation();
      },
      { deep: true },
    );
  }

  type ErrorKey = keyof z.infer<typeof schema> extends string
    ? keyof z.infer<typeof schema>
    : never;

  function getError(path: ErrorKey): string[] | undefined {
    const error = get(
      errors.value,
      `${path.replaceAll('.', ',')}.0.message`,
    );
    if (!error) return;
    return Array.isArray(error)
      ? error.map((e) => e.message)
      : [error];
  }

  async function validate() {
    clearErrors();
    const res = await schema.safeParseAsync(toValue(formData));
    isValid.value = res.success;

    if (!res.success) {
      errors.value = groupBy(res.error.issues, 'path');
      validationWatch();
    }

    return errors;
  }

  validationWatch();

  return { validate, getError, clearErrors, errors, isValid };
}
