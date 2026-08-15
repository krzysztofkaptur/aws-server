import { randomUUID } from "crypto";
import type { CreatePostInput, Post, UpdatePostInput } from "../types/post";

const posts: Post[] = [
  {
    id: "1",
    title: "Hello World",
    content: "This is the first post.",
    author: "Alice",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Hello World dupa",
    content: "This is the first post.",
    author: "Alice",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostById(id: string): Post | undefined {
  return posts.find((post) => post.id === id);
}

export function createPost(input: CreatePostInput): Post {
  const now = new Date().toISOString();
  const post: Post = {
    id: randomUUID(),
    title: input.title,
    content: input.content,
    author: input.author,
    createdAt: now,
    updatedAt: now,
  };

  posts.push(post);
  return post;
}

export function updatePost(id: string, input: UpdatePostInput): Post | undefined {
  const post = getPostById(id);
  if (!post) {
    return undefined;
  }

  if (input.title !== undefined) {
    post.title = input.title;
  }
  if (input.content !== undefined) {
    post.content = input.content;
  }
  if (input.author !== undefined) {
    post.author = input.author;
  }

  post.updatedAt = new Date().toISOString();
  return post;
}

export function replacePost(id: string, input: CreatePostInput): Post | undefined {
  const post = getPostById(id);
  if (!post) {
    return undefined;
  }

  post.title = input.title;
  post.content = input.content;
  post.author = input.author;
  post.updatedAt = new Date().toISOString();
  return post;
}

export function deletePost(id: string): boolean {
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) {
    return false;
  }

  posts.splice(index, 1);
  return true;
}
