import cds from "@sap/cds";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import "./auth";

cds.on("bootstrap", (app) => {
  // const PORT = process.env.PORT || 4004;

  // Enable Cors
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
    next();
  });

  app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/login", (req: Request, res: Response) => {
    res.send('<a href="/auth/google">Login here</a>');
  });

  app.get("/error", (req: Request, res: Response) => {
    res.send("<h1>error</h1>");
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/success",
      failureRedirect: "/error",
    }),
    (req: Request, res: Response, next: NextFunction) => {
      res.redirect("/");
    }
  );

  app.get("/success", (req: Request, res: Response, next: NextFunction) => {
    res.send("<h1>success</h1>");
  });

  app.get(
    "/odata/v4/*",
    async (req: Request, res: Response, next: NextFunction) => {
      // console.log(req.user);
      // next();
      if (req.user) {
        try {
          const cdsService = await cds.run(
            SELECT.from("NoteService.Users").where({
              emailAddress: req.user.email,
            })
          );
          if (cdsService.length > 0) {
            next();
          } else {
            res.status(401).send("Unauthorized, please register first");
          }
        } catch (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
      } else {
        res.redirect("/auth/google");
      }
    }
  );
  app.get("/logout", (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    res.redirect("/");
  });

  // // User for JS compiler
  // cds.serve("NoteService").in(app);
  // app.listen(PORT, () => {
  //   console.log("Running custom CAP server in ", PORT);
  // });
});
export default cds.server;
