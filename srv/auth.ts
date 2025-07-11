import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import passport, { DoneCallback, Profile } from "passport";
import { Request } from "@sap/cds";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleSecretKey = process.env.GOOGLE_SECRET_KEY;
const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL;

interface LocalProfile extends Profile {
  email: string;
}

if (!googleClientId || !googleSecretKey || !googleCallbackUrl) {
  throw new Error(
    "Google OAuth credentials are missing in environment variables."
  );
}

passport.serializeUser(function (user, done: DoneCallback) {
  done(null, user);
});

passport.deserializeUser(function (user: LocalProfile, done: DoneCallback) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleSecretKey,
      callbackURL: `${googleCallbackUrl}auth/google/callback`,
    },
    function (
      accessToken: string,
      refreshToken: string,
      profile: LocalProfile,
      done: DoneCallback
    ) {
      return done(null, profile);
    }
  )
);
