import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../../models/user.model";
import { generateUniqueUsername } from "../../utils/auth.utils";
import { env } from "../../config/envConfig";

const googleStrategyOptions = {
  clientID: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_SECRET_KEY,
  callbackURL: env.GOOGLE_CALLBACK,
};

passport.use(
  new GoogleStrategy(
    googleStrategyOptions,
    async (_accessToken, _refreshToken, profile, cb) => {
      try {
        let existedUser = await User.findOne({
          googleId: profile.id,
        });

        if (!existedUser) {
          existedUser = new User({
            googleId: profile.id,
            email: profile.emails?.[0]?.value,
            avatar: profile.photos?.[0]?.value,
            username: generateUniqueUsername(),
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

export { passport as googlePassport };
