export const AccountKind = {
  STUDENT: 6,
  PARENT: 7,
  TEACHER: 8,
  HYPERPLANNING: 0 // Special key to bypass authentication
} as const;

export type AccountKind = typeof AccountKind[keyof typeof AccountKind];
