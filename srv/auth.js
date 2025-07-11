"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth2_1 = require("passport-google-oauth2");
const passport_1 = __importDefault(require("passport"));
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleSecretKey = process.env.GOOGLE_SECRET_KEY;
const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL;
if (!googleClientId || !googleSecretKey || !googleCallbackUrl) {
    throw new Error("Google OAuth credentials are missing in environment variables.");
}
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.use(new passport_google_oauth2_1.Strategy({
    clientID: googleClientId,
    clientSecret: googleSecretKey,
    callbackURL: `${googleCallbackUrl}auth/google/callback`,
}, function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));
