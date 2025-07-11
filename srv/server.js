"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cds_1 = __importDefault(require("@sap/cds"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
require("./auth");
cds_1.default.on("bootstrap", (app) => {
    // const PORT = process.env.PORT || 4004;
    // Enable Cors
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
        next();
    });
    app.use((0, express_session_1.default)({ secret: "cats", resave: true, saveUninitialized: true }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.get("/login", (req, res) => {
        res.send('<a href="/auth/google">Login here</a>');
    });
    app.get("/error", (req, res) => {
        res.send("<h1>error</h1>");
    });
    app.get("/auth/google", passport_1.default.authenticate("google", { scope: ["email", "profile"] }));
    app.get("/auth/google/callback", passport_1.default.authenticate("google", {
        successRedirect: "/success",
        failureRedirect: "/error",
    }), (req, res, next) => {
        res.redirect("/");
    });
    app.get("/success", (req, res, next) => {
        res.send("<h1>success</h1>");
    });
    app.get("/odata/v4/*", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(req.user);
        // next();
        if (req.user) {
            try {
                const cdsService = yield cds_1.default.run(SELECT.from("NoteService.Users").where({
                    emailAddress: req.user.email,
                }));
                if (cdsService.length > 0) {
                    next();
                }
                else {
                    res.status(401).send("Unauthorized, please register first");
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        }
        else {
            res.redirect("/auth/google");
        }
    }));
    app.get("/logout", (req, res, next) => {
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
exports.default = cds_1.default.server;
