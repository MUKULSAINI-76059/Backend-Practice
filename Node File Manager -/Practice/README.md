# Node File Manager

Simple CRUD file management application built with Node.js and Express.

## Features

- Create new task/file with title and details
- Read/view file contents
- Edit existing files (rename)
- Delete files with confirmation
- Static assets served from `public/`
- EJS templating + Tailwind CSS styling
- dotenv support for configuration

## Installation

```bash
git clone https://github.com/MukulSaini-76059/Node-File-Manager.git
cd Node-File-Manager/Practice
npm install
```

## Usage

1. Create a `.env` file in the root with a `PORT` value:
   ```env
   PORT=3000
   ```
2. Start the server:
   ```bash
   npm start        # or `node server2.js` / `npx nodemon`
   ```
3. Open `http://localhost:3000` in a browser.

## Deployment

The app can be deployed on Render, Heroku, or any Node-friendly host. Ensure:

- The GitHub repository is connected
- The tracked branch (e.g. `main`) contains the latest commits
- `npm install` is run during build (package.json has dependencies)
- A `PORT` environment variable is set by the host

## License

ISC
