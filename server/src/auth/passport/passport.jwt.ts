import { Strategy as JwtStrategy } from "passport-jwt";
import passport from "passport";
import { Request } from "express";
import { User } from "../../models/user.model";
import { env } from "../../config/envConfig";
const key = env.ACCESS_TOKEN_SECRET;

const cookieExtractor = (req: Request) => {
  if (req && req.cookies) {
    return req.cookies["accessToken"] ?? null;
  }
  return null;
};
const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: key,
};
passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.sub).select("+role -password");
      if (!user) return done(null, false, { message: "User not found" });
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  }),
);

export { passport as passportJwt };
