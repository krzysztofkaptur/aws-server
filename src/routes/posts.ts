import { Router, type Request, type Response } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  replacePost,
  updatePost,
} from "../store/postsStore";

const router = Router();

/**
 * @openapi
 * /posts:
 *   get:
 *     summary: List all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get("/", (_req: Request, res: Response) => {
  res.json(getAllPosts());
});

/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
router.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const post = getPostById(req.params.id);
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.json(post);
});

/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostInput'
 *     responses:
 *       201:
 *         description: Post created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid request body
 */
router.post("/", (req: Request, res: Response) => {
  const { title, content, author } = req.body ?? {};

  if (
    typeof title !== "string" ||
    typeof content !== "string" ||
    typeof author !== "string" ||
    !title.trim() ||
    !content.trim() ||
    !author.trim()
  ) {
    res.status(400).json({
      error: "title, content, and author are required non-empty strings",
    });
    return;
  }

  const post = createPost({ title, content, author });
  res.status(201).json(post);
});

/**
 * @openapi
 * /posts/{id}:
 *   put:
 *     summary: Replace a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostInput'
 *     responses:
 *       200:
 *         description: Post replaced
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Post not found
 */
router.put("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { title, content, author } = req.body ?? {};

  if (
    typeof title !== "string" ||
    typeof content !== "string" ||
    typeof author !== "string" ||
    !title.trim() ||
    !content.trim() ||
    !author.trim()
  ) {
    res.status(400).json({
      error: "title, content, and author are required non-empty strings",
    });
    return;
  }

  const post = replacePost(req.params.id, { title, content, author });
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.json(post);
});

/**
 * @openapi
 * /posts/{id}:
 *   patch:
 *     summary: Partially update a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePostInput'
 *     responses:
 *       200:
 *         description: Post updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Post not found
 */
router.patch("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { title, content, author } = req.body ?? {};

  if (title === undefined && content === undefined && author === undefined) {
    res.status(400).json({
      error: "Provide at least one of title, content, or author",
    });
    return;
  }

  if (title !== undefined && (typeof title !== "string" || !title.trim())) {
    res.status(400).json({ error: "title must be a non-empty string" });
    return;
  }
  if (content !== undefined && (typeof content !== "string" || !content.trim())) {
    res.status(400).json({ error: "content must be a non-empty string" });
    return;
  }
  if (author !== undefined && (typeof author !== "string" || !author.trim())) {
    res.status(400).json({ error: "author must be a non-empty string" });
    return;
  }

  const post = updatePost(req.params.id, { title, content, author });
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.json(post);
});

/**
 * @openapi
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Post deleted
 *       404:
 *         description: Post not found
 */
router.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const deleted = deletePost(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.status(204).send();
});

export default router;
