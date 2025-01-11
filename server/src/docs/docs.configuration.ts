import path from "path";
const routes = path.join(__dirname, "**", "*.yml");

export default {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Swagger",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:8000/api/v1",
      },
    ],
  },
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "accessToken",
        description:
          "Cookie-based authentication using access and refresh tokens.",
      },
    },
  },
  apis: [routes],
};
