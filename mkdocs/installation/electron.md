# Install Desktop App

1. **Navigate**

   ```bash
   cd clipchronicle/electron-app
   ```

2. **Install**

   ```bash
   pnpm install
   ```

3. **Build native module**

   ```bash
   cd native-clipboard
   cargo build --release
   cd ..
   ```

4. **Run in dev**

   ```bash
   pnpm dev
   ```

5. **Package installers**

   ```bash
   pnpm make
   ```

6. **Artifacts**
   Find `.exe`, `.dmg`, and `.AppImage` in `out/`.

---

Return to [Installation index](./landing.md)
