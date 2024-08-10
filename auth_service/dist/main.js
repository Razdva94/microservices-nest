"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
const task_project_razdva1994_1 = require("task-project-razdva1994");
const microservices_1 = require("@nestjs/microservices");
async function start() {
  const PORT = process.env.PORT || 5001;
  const app1 = await core_1.NestFactory.createMicroservice(
    app_module_1.AppModule,
    {
      transport: microservices_1.Transport.RMQ,
      options: {
        urls: ["amqp://my-rabbitmq:5672"],
        queue: "auth_service_queue",
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app1.listen();
  const app = await core_1.NestFactory.create(app_module_1.AppModule);
  app.setViewEngine("hbs");
  app.enableCors();
  app.use(cookieParser());
  const config = new swagger_1.DocumentBuilder()
    .setTitle("Go internship")
    .setDescription("Документация REST API")
    .setVersion("1.0.0")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "access-token",
    )
    .addTag("Razdva project")
    .build();
  const document = swagger_1.SwaggerModule.createDocument(app, config);
  swagger_1.SwaggerModule.setup("/api/auth-docs", app, document);
  app.useGlobalFilters(new task_project_razdva1994_1.AllExceptionsFilter());
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();
//# sourceMappingURL=main.js.map
