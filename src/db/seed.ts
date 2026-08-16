import { count, sql } from "drizzle-orm";
import { db } from "./index";
import { postsTable } from "./schema";

const SEED_POSTS = [
  {
    title: "Hello World",
    content: "This is the first post.",
    author: "Alice",
  },
  {
    title: "Getting started",
    content: "Create, update, and delete posts through the REST API.",
    author: "Bob",
  },
  {
    title: "Docker and Postgres",
    content: "The API and database run together with docker compose.",
    author: "Carol",
  },
] as const;

export async function runSeed(): Promise<void> {
  await db.transaction(async (tx) => {
    // Serialize concurrent boots (e.g. multiple containers) so we seed at most once.
    await tx.execute(sql`SELECT pg_advisory_xact_lock(8723641)`);

    const [row] = await tx.select({ value: count() }).from(postsTable);
    if ((row?.value ?? 0) > 0) {
      return;
    }

    await tx.insert(postsTable).values([...SEED_POSTS]);
  });
}
