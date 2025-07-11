"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cds_1 = __importDefault(require("@sap/cds"));
class DummyUser extends cds_1.default.User {
}
exports.default = (req, res, next) => {
    // req.user = new cds.User({
    // 	id: "sample",
    // 	roles: ["interns"],
    // 	attr: {
    // 		company: "Accenture",
    // 	},
    // });
    // next();
    if (req === null || req === void 0 ? void 0 : req.user) {
        req.user = new cds_1.default.User(req.user);
    }
    //    else {
    //     res.redirect("/auth/google");
    //   }
    next();
};
