import type { InstanceParameters, WeekFrequency } from "~/models";
import { decodePronoteDate } from "./pronote-date";
import { decodeDomain } from "./domain";
import { decodeHoliday } from "./holiday";
import { decodePeriod } from "./period";

export const decodeInstanceParameters = (parameters: any): InstanceParameters => {
  if (parameters?.parametreGeneral?.avecAuthentification === false) {
    // HYPERPLANNING handling
    return hyperplanningDecodeIP(parameters);
  }
  const weekFrequencies = new Map<number, WeekFrequency>();

  for (const fortnight of [1, 2]) {
    const frequency = decodeDomain(parameters.General.DomainesFrequences[fortnight].V);
    for (const week of frequency) {
      weekFrequencies.set(week, {
        label: parameters.General.LibellesFrequences[fortnight],
        fortnight
      });
    }
  }

  return {
    hasAuthentication: true,
    version: parameters.General.versionPN.split(".").map(Number),
    nextBusinessDay: decodePronoteDate(parameters.General.JourOuvre.V),
    firstMonday: decodePronoteDate(parameters.General.PremierLundi.V),
    firstDate: decodePronoteDate(parameters.General.PremiereDate.V),
    lastDate: decodePronoteDate(parameters.General.DerniereDate.V),

    navigatorIdentifier: parameters.identifiantNav,
    endings: parameters.General.ListeHeuresFin.V.map((ending: any) => ending.L),
    periods: parameters.General.ListePeriodes.map(decodePeriod),
    holidays: parameters.General.listeJoursFeries.V.map(decodeHoliday),
    weekFrequencies,
    blocksPerDay: parameters.General.PlacesParJour
  };
};

const hyperplanningDecodeIP = (parameters: any): InstanceParameters => {
  return {
    hyperplanning: true,
    hasAuthentication: false,
    version: parameters.parametreGeneral.Version.V.split(" ")[1].split(".").map(Number),
    nextBusinessDay: new Date(),
    firstMonday: decodePronoteDate(parameters.parametreGeneral.PremierLundi.V),
    firstDate: decodePronoteDate(parameters.parametreGeneral.PremierLundi.V), //Unsure why PremiereDate isn't a thing
    lastDate: decodePronoteDate(parameters.parametreGeneral.DerniereDate.V),

    navigatorIdentifier: parameters.identifiantNav,
    endings: [],
    periods: [],
    // holidays: JSON.parse(parameters.parametreGeneral.JoursFeries.V).map(decodeHoliday),
    weekFrequencies: new Map(),
    holidays: [],
    blocksPerDay: parameters.parametreGeneral.PlacesParJour
  };
};
