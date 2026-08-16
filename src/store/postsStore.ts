import { eq } from "drizzle-orm";
import { db } from "../db";
import { postsTable } from "../db/schema";
import type { CreatePostInput, Post, UpdatePostInput } from "../types/post";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Postgres throws on invalid UUID params; treat those ids as not found.
function isUuid(id: string): boolean {
  return UUID_PATTERN.test(id);
}

function toPost(row: typeof postsTable.$inferSelect): Post {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    author: row.author,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const rows = await db.select().from(postsTable);
  return rows.map(toPost);
}

export async function getPostById(id: string): Promise<Post | undefined> {
  if (!isUuid(id)) {
    return undefined;
  }

  const [row] = await db.select().from(postsTable).where(eq(postsTable.id, id));
  return row ? toPost(row) : undefined;
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const [row] = await db.insert(postsTable).values(input).returning();
  if (!row) {
    throw new Error("Failed to create post");
  }
  return toPost(row);
}

export async function updatePost(
  id: string,
  input: UpdatePostInput,
): Promise<Post | undefined> {
  if (!isUuid(id)) {
    return undefined;
  }

  const [row] = await db
    .update(postsTable)
    .set({
      ...input,
      updatedAt: new Date(),
    })
    .where(eq(postsTable.id, id))
    .returning();

  return row ? toPost(row) : undefined;
}

export async function replacePost(
  id: string,
  input: CreatePostInput,
): Promise<Post | undefined> {
  if (!isUuid(id)) {
    return undefined;
  }

  const [row] = await db
    .update(postsTable)
    .set({
      title: input.title,
      content: input.content,
      author: input.author,
      updatedAt: new Date(),
    })
    .where(eq(postsTable.id, id))
    .returning();

  return row ? toPost(row) : undefined;
}

export async function deletePost(id: string): Promise<boolean> {
  if (!isUuid(id)) {
    return false;
  }

  const deleted = await db
    .delete(postsTable)
    .where(eq(postsTable.id, id))
    .returning({ id: postsTable.id });

  return deleted.length > 0;
}
