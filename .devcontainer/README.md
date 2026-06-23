Dev container for sepidman.github.io

This devcontainer provides a reproducible development environment for this Eleventy site.

Included tools:
- Node 20 and npm (via the base devcontainer image)
- git
- GitHub CLI (`gh`)
- build tools: `build-essential`, `python3`, `make`, etc.
- utilities: `curl`, `ripgrep`, `jq`

How to use
1. Install Docker Desktop on Windows and ensure it is running.
2. Open this repository in VS Code.
3. Run the command: **Dev Containers: Reopen in Container** (Command Palette).

What happens when the container is created
- The Dockerfile installs the system tools above.
- `postCreateCommand` in `.devcontainer/devcontainer.json` runs `npm install` which will install dependencies and generate `package-lock.json` in the workspace.

After the container starts
- Verify the site builds: `npm run build`.
- If `package-lock.json` was created, commit it so CI can use `npm ci`.

Commit example after container run:

```bash
git add package-lock.json
git commit -m "chore: add package-lock.json (generated in devcontainer)"
git push origin main
```
