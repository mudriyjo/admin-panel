import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Removes a field from an errors object by key
 * Used to clear validation errors when user starts typing in a field
 */
export function clearFieldError<T extends Record<string, any>>(
  errors: Partial<Record<keyof T, string>>,
  fieldName: keyof T
): Partial<Record<keyof T, string>> {
  const newErrors = { ...errors }
  delete newErrors[fieldName]
  return newErrors
}
