# Posts API

Simple Express + TypeScript REST API with in-memory posts storage and Swagger docs.

## Setup

```bash
npm install
npm run dev
```

- API: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api-docs`

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
