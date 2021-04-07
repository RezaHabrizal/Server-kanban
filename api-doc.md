# kanban-server

​
List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /googlelogin`

And routes below need authentication
- `POST /tasks`
- `GET /tasks`

And routes below needs authentication and authorization
- `DELETE /tasks/:id`
- `PUT /tasks/:id`
- `GET /tasks/:id`

### POST /register

Request:

_Request Body_

```json
{
  "email": "string",
  "password": "string",
  "name": "string",
}
```

_Response (201 - Created)_
  ​
```json
{
  "id": "integer",
  "name": "string"
}
```

_Response (409 - Conflict)_

```json
{
  "message": "Email already exist"
}
```

_Response (409 - Length Required)_

```json
{
    "message": "Minimum password character is 6"
}
```

### POST /login

Request:

_Request Body_


```json
{
  "email": "string",
  "password": "string"
}
```

Response:

_Response (200 - OK)_​

```json
{
  "access_token": "string",
  "name": "string",
  "avatar": "string"
}
```

_Response (404 - not found)_

```json
{
  "message": "invalid username/password"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "invalid username/password"
}
```

### PUT /googlelogin

Request:

_Request Body_

required(account google)
```json
{
  "email": "string",
}
```

-status: 200
```json
{
    "access_token": "string",
    "name": "string",
    "avatar": "string"
}
```

-status: 500
```json
{
    "message": "<error messages || internal server error>"
}
```

### POST /tasks
Request:

- headers: access_token

- data:

```json
{
  "title": "string",
  "description": "string",
  "category": "string",
  "priority": "string",
  "dueDate": "date",
  "userId": "integer"
}
```

​Response:

- status: 201
- body:
```json
{
  "title": "string",
  "description": "string",
  "category": "string",
  "priority": "string",
  "dueDate": "date",
  "userId": "integer",
  "createdAt": "date",
  "updatedAt": "date"
}
```

-status 409
```json
{
    "message": "<required fields> || <date should more than current date>" 
}
```

### GET /tasks

Description: Get all tasks all user

Request:

- headers:
  - access_token: string

Response:

- status: 200
- body:
```json
{
  "title": "string",
  "description": "string",
  "category": "string",
  "priority": "string",
  "dueDate": "date",
  "userId": "integer",
  "createdAt": "date",
  "updatedAt": "date"
}
```
status: 500
```json
{
    "message": "<error messages || internal server error>"
}
```

### GET /tasks/:id

description: 
  to get into edited task by id

Request: 

- headers: access_token
- params: 
  - id: integer (required)

  status: 200
  body:
  ```json
  {
    "task": "<task>"
  }
  ```

  status: 404
  ```json
  {
    "message": "task not found"
  }
  ```

  status: 500
  ```json
  {
    "message": "<error message || internal server error>"
  }
  ```

### DELETE /tasks/:id

description: 
  Delete one of the current logged in user. (cannot delete another user tasks)

Request:

- headers: access_token
- params: 
  - id: integer (required)

Response:

- status: 200
- body:
```json
{
    "message": "succes delete task"
}
```

-status: 500
```json
{
    "message": "<error message || internal server error>"
}
```

### PUT /tasks/:id

description: update / edit task

Request:

- headers: access_token
- params: 
  - id: integer (required)

  Response: 

  -status 200
  ```json
  {
      "task": "<updated task>"
  }
  ```

 -status: 500
```json
{
    "message": "<error message || internal server error>"
}
```


