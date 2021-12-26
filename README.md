# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- **Your Node vershon should be >= 16.0.0**

## Downloading

```
git clone {repository URL}
```

Switch to the task branch.

## Setting project for different OS

Create file nodemon.json in root directory with given content:
```
{
  "watch": ["src/**/*.ts"],
  "execMap": {
    "ts": "ts-node"
  }
}
```
Install
```
 npm install -D ts-node 
```
Or in case of problems
```
npm install -g ts-node 
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

You can test app behaviour using docker. 
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

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```
## Logging

When specifying a logging level, records of this level and all levels with a higher priority will be logged. For example, by specifying level 2, you will collect all messages of levels 0, 1, and 2. **This functionality works for the console** (not for log files),  where the server is running
Scheme:
```
  '0': 'error',
  '1': 'warn',
  '2': 'info',
  '3': 'debug',
  '4': 'silly',
```
## App Info

Endpoints operate  with in-memory data.
Service should listen on PORT 4000.
To generate all entities ids  uuid package is used.


## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
