import cds, { Request } from "@sap/cds";
import { NextFunction, Response } from "express";

class DummyUser extends cds.User {
  // This overrides the 'is' method and returns a boolean.
  // is(role: string): boolean {
  // 	return true;
  // }
}

export default (req: Request, res: Response, next: NextFunction): void => {
  // req.user = new cds.User({
  // 	id: "sample",
  // 	roles: ["interns"],
  // 	attr: {
  // 		company: "Accenture",
  // 	},
  // });
  // next();
  if (req?.user) {
    req.user = new cds.User(req.user);
  }
  //    else {
  //     res.redirect("/auth/google");
  //   }
  next();
};
