import type { SessionHandle, Resource } from "~/models";
import { decodePronoteDate } from "./pronote-date";
import { decodeSubject } from "./subject";
import { decodeResourceContent } from "./resource-content";

export const decodeResource = (resource: any, session: SessionHandle): Resource => {
  return {
    id: resource.N,
    startDate: decodePronoteDate(resource.Date.V),
    endDate: decodePronoteDate(resource.DateFin.V),
    subject: decodeSubject(resource.Matiere.V),

    haveAssignment: typeof resource.dateTAF !== "undefined",
    assignmentDeadline: resource.dateTAF?.V && decodePronoteDate(resource.dateTAF.V),

    teachers: resource.listeProfesseurs.V.map((teacher: any) => teacher.L),
    groups: resource.listeGroupes.V.map((group: any) => group.L),

    backgroundColor: resource.CouleurFond,
    contents: resource.listeContenus.V.map((content: any) => decodeResourceContent(content, session))
  };
};
