# Posts API

Express + TypeScript REST API for posts, backed by PostgreSQL (Drizzle ORM) with Swagger docs.

## Setup

```bash
pnpm install
pnpm db:up
pnpm dev
```

Or run API + Postgres together:

```bash
pnpm docker:up
```

Copy `.env.example` to `.env` for local `pnpm dev`. Migrations run on server start.

- API: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api-docs`

After schema changes: `pnpm db:generate`.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/posts` | List posts |
| `GET` | `/posts/:id` | Get one post |
| `POST` | `/posts` | Create a post |
| `PUT` | `/posts/:id` | Replace a post |
| `PATCH` | `/posts/:id` | Partially update a post |
| `DELETE` | `/posts/:id` | Delete a post |

### Create / replace body

```json
{
  "title": "My post",
  "content": "Hello",
  "author": "Alice"
}
```
