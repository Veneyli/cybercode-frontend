import { useCallback } from "react";
import { validationRules } from "@/shared/utils/validationRules";

export const useFieldValidation = () => {
  const validateField = useCallback(
    (
      fieldName: string,
      value: string,
      valuePassword?: string
    ): string | undefined => {
      const validate = validationRules[fieldName];
      return validate ? validate(value, valuePassword) : undefined;
    },
    []
  );

  return { validateField };
};
