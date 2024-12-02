import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "dotenv";
import passport from "passport";
import { User } from "../../models/user.model";
config();

const googleStrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_SECRETE_KEY as string,
  callbackURL: process.env.GOOGLE_CALLBACK as string,
};

passport.use(
  new GoogleStrategy(
    googleStrategyOptions,
    async (_accessToken, _refreshToken, profile, cb) => {
      try {
        let existedUser = await User.findOne({
          googleId: profile.id,
          email: profile.emails?.[0]?.value,
        });
        if (!existedUser) {
          existedUser = new User({
            googleId: profile.id,
            email: profile.emails?.[0]?.value,
          });
          await existedUser.save();
        }

        return cb(null, existedUser);
      } catch (e) {
        return cb(e, false);
      }
    },
  ),
);
