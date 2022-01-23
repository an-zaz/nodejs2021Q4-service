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

Switch to the task branch.

```
git checkout task8-postgreSQL-Typeorm
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

Scenario:
 * `User` (`/users` route)
      * `GET /users` - get all users (remove password from response)
      * `GET /users/:userId` - get the user by id (ex. “/users/123”) (remove password from response)
      * `POST /users` - create user
      * `PUT /users/:userId` - update user
      * `DELETE /users/:userId` - delete user
    * `Board` (`/boards` route)
      * `GET /boards` - get all boards
      * `GET /boards/:boardId` - get the board by id
      * `POST /boards` - create board
      * `PUT /boards/:boardId` - update board
      * `DELETE /boards/:boardId` - delete board
    * `Task` (`boards/:boardId/tasks` route)
      * `GET boards/:boardId/tasks` - get all tasks
      * `GET boards/:boardId/tasks/:taskId` - get the task by id
      * `POST boards/:boardId/tasks` - create task
      * `PUT boards/:boardId/tasks/:taskId` - update task
      * `DELETE boards/:boardId/tasks/:taskId` - delete task
     
or run **17** tests:

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
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
