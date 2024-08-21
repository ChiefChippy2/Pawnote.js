import { RequestFN } from "~/core/request-function";
import { EntityState, SessionHandle, TabLocation } from "~/models";

export const assignmentStatus = async (session: SessionHandle, assignmentID: string, done: boolean): Promise<void> => {
  const request = new RequestFN(session, "SaisieTAFFaitEleve", {
    _Signature_: { onglet: TabLocation.Assignments },

    donnees: {
      listeTAF: [{
        E: EntityState.MODIFICATION,
        TAFFait: done,
        N: assignmentID
      }]
    }
  });

  await request.send();
};
