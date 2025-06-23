# Configuration

ClipChronicle reads environment variables from `.env.local` in each package.

| Variable           | Description                          | Example                             |
| ------------------ | ------------------------------------ | ----------------------------------- |
| `CC_DB_PATH`       | Custom path for SQLite DB            | `/home/me/.clipchronicle/db.sqlite` |
| `CC_DISABLE_AI`    | Disable all AI/LLM features          | `true`                              |
| `CC_BACKUP_BUCKET` | S3/GCS bucket for encrypted backups  | `s3://my-bucket/snippets`           |
| `CC_SQLCIPHER_KEY` | AES-256 key for SQLCipher encryption | `Super$ecretKey123`                 |

---

Return to [Home](index.md)
