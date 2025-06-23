# Frequently Asked Questions

**Q: Does ClipChronicle work offline?**  
A: Yes—everything runs locally. No network unless backups are enabled.

**Q: Supported OS?**  
A: Windows 10+, macOS 12+ (x86 & Apple Silicon), Linux AppImage.

**Q: Can I encrypt my database?**  
A: Yes—set `CC_SQLCIPHER_KEY` in `.env.local` for AES-256 encryption.

**Q: How do I back up my snippets?**  
A: Configure `CC_BACKUP_BUCKET` to an S3/GCS bucket; backups happen via `backup.sh`.

---

Return to [Home](index.md)
