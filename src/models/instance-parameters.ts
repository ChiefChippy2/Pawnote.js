import type { Holiday } from "./holiday";
import type { Period } from "./period";
import type { WeekFrequency } from "./week-frequency";

export type InstanceParameters = Readonly<{
  hyperplanning?: Boolean
  nextBusinessDay: Date
  firstMonday: Date
  firstDate: Date
  lastDate: Date
  hasAuthentication?: Boolean

  /**
   * Allows to recognize the device for next authentications.
   */
  navigatorIdentifier: string
  version: number[]
  endings: string[]
  periods: Period[]
  holidays: Holiday[]
  weekFrequencies: Map<number, WeekFrequency>
  blocksPerDay: number
  info?: any
}>;
