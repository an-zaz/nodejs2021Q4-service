# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- **Your Node vershon should be >= 16.0.0**
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/)

## Downloading

```
git clone git@github.com:an-zaz/nodejs2021Q4-service.git
```

Switch to the task branch:
```
git checkout task9-authentification-JWT
```

Switch to the app folder.

```
cd .\nodejs2021Q4-service\
```


## Installing NPM modules

```
npm install
```

### Run Docker Container
To run docker container switch to task8-postgreSQL-Typeorm branch and run:
```
docker-compose up
```
**If the nodeJs container is down, please change something in src/app.ts file to make it reload.  (for example add some enters)** 

### Run Migrations

```
npm run typeorm
```

## Testing

```
npm test:auth
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
