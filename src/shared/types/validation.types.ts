export interface ValidationUtils {
  [key: string]: (
    value: string,
    valuePassword?: string,
    valueConfirmPassword?: string
  ) => string | undefined;
}
