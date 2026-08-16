import "dotenv/config";
import app from "./app";
import { runMigrations } from "./db/migrate";
import { runSeed } from "./db/seed";

const PORT = Number(process.env.PORT) || 3000;

async function main(): Promise<void> {
  await runMigrations();
  await runSeed();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
  });
}

main().catch((error: unknown) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
