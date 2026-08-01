import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Posts API",
      version: "1.0.0",
      description: "Simple REST API for managing posts",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],
    components: {
      schemas: {
        Post: {
          type: "object",
          required: ["id", "title", "content", "author", "createdAt", "updatedAt"],
          properties: {
            id: { type: "string", example: "1" },
            title: { type: "string", example: "Hello World" },
            content: { type: "string", example: "This is the first post." },
            author: { type: "string", example: "Alice" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreatePostInput: {
          type: "object",
          required: ["title", "content", "author"],
          properties: {
            title: { type: "string", example: "My new post" },
            content: { type: "string", example: "Post body goes here." },
            author: { type: "string", example: "Bob" },
          },
        },
        UpdatePostInput: {
          type: "object",
          properties: {
            title: { type: "string", example: "Updated title" },
            content: { type: "string", example: "Updated content" },
            author: { type: "string", example: "Carol" },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
