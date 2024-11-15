import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import options from "./docs/docs.configuration";
// import { rateLimit } from "express-rate-limit";
import { AuthRoutes } from "./routes/auth.routes";
import { UserRoutes } from "./routes/user.routes";
import { AddressDirectionRoutes } from "./routes/addressDirection.routes";
import { CategoryRoutes } from "./routes/category.routes";
import { ProductRoutes } from "./routes/product.routes";
import { CommentRoutes } from "./routes/comment.routes";
import { passportJwt } from "./auth/passport/passport.jwt";
import { OrderRoutes } from "./routes/order.routes";

const app: Application = express();

const specs = swaggerJSDoc(options);

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   limit: 100,
//   message: "Too many requests from this IP, please try again later.",
//   standardHeaders: true, // Send RateLimit-* headers
//   legacyHeaders: false, // Disable X-RateLimit-* headers
// });
app.disable("x-powered-by");
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  }),
);
app.use(helmet());
// app.use(limiter);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passportJwt.initialize());

app.use("/api/v1", AuthRoutes);
app.use("/api/v1", UserRoutes);
app.use("/api/v1", AddressDirectionRoutes);
app.use("/api/v1", CategoryRoutes);
app.use("/api/v1", ProductRoutes);
app.use("/api/v1", CommentRoutes);
app.use("/api/v1", OrderRoutes);

app.use("/api/v1/docs/", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;
