import video from "./video.swagger.js";

const swaggerDocument = {
  openapi: "3.1.0",
  info: {
    title: "Be Cyber Media",
    version: "123123123123",
  },
  servers: [
    {
      url: "http://localhost:3069",
      description: "server tại localhost",
    },
  ],
  components: {
    securitySchemes: {
      quangToken: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    ...video,
  },
};

export default swaggerDocument;
