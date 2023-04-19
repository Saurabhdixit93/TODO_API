##  Todo App API with JWT Authentication

This is a RESTful API for a Todo App built using Node.js and Express with JWT (JSON Web Token) authentication. The API allows users to create, read, update, and delete tasks, as well as authenticate and manage their tasks using JWT. The API uses MongoDB as the database to store task information, including task names, descriptions, and statuses.



## Requirements

1. Implement a RESTful API using Node.js and Express to manage tasks in a Todo App.

2. Users should be able to create, read, update, and delete tasks using appropriate HTTP methods (POST, GET, PUT, DELETE).

3. Use MongoDB as the database to store task information, including task names, descriptions, and statuses (e.g., completed, pending).

4..Implement JWT authentication using jsonwebtoken.

5. Users should be able to register, log in, and receive a JWT upon successful authentication.

6. Implement authorization to ensure that only authenticated users can perform CRUD operations on their own tasks.

## Getting Started

Prerequisites
 > To run this project, you need to have Node.js and MongoDB installed on your machine.

Installing
1. Clone the repository to your local machine:

git clone https://github.com/your_username/todo-app-api.git


2. Install the dependencies:
 > `npm install`

3. Create a .env file in the root directory of the project and set the following environment variables:

MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret_key
SMTP_USER=your_email_user_email
SMTP_PASS=your_smtp_pass
SMTP_FROM= your_smtp_from_email
SMTP_PORT=your_smtp_port
SMTP_HOST=your_smtp_host


Make sure to replace your_jwt_secret_key, your_mongo_uri, and your_email_user_email ,your_smtp_pass, your_smtp_from_email, your_smtp_port, your_smtp_host with your own values.

# Running the project 

To run the project, use the following command:
 >` npm start`

> after running this command please visit` http://localhost:5000/`

## Usage

# Authentication
 > The API uses JWT authentication to secure the endpoints. 
 To authenticate, 
 send a POST request to the `/api/auth/register`
endpoint with a JSON body containing the email and password fields:

`{
  "email": "user@example.com",
  "password": "password"
}`

> Response:

`{
  "token": "your_token_here",
  "message": "User registered successfully"
}`


 > If the registration is successful, the API will return a JWT token that you can use to authenticate subsequent requests.

 >To log in, 
 send a POST request to the `/api/auth/login` 
 endpoint with a JSON body containing the same email and password fields:

`{
  "email": "user@example.com",
  "password": "password"
}`

> Response:
`{
 "message": "User Login successfully"
  "token": "your_token_here"
}`


 > If the login is successful, the API will return a JWT token that you can use to authenticate subsequent requests.

To authenticate subsequent requests, set the Authorization header to Bearer <TOKEN>, where <TOKEN> is the JWT token returned from the login or registration endpoints.

# CRUD Operations

The API allows users to create, read, update, and delete tasks using the following endpoints:

`-` POST         /api/user/task - Create a new task
`-` GET          /api/user/task - Get a list of tasks
`-` GET          /api/user/task/:id - Get a specific task by ID
`-` PUT          /api/user/task/:id - Update a specific task by ID
`-` DELETE       /api/user/task/:id - Delete a specific task by ID


## Tasks Endpoint Documentation

The tasks endpoint allows users to create, read, update, and delete tasks. Only authenticated users can perform these operations on their own tasks.

Base URL:

`http://localhost:3000/api/user/task`

## Authentication

JWT authentication is used to authenticate users. To authenticate, send a POST request to the login endpoint with the email and password of the user. If the email and password are correct, a JWT will be returned in the response. This JWT should be included in the Authorization header for all requests that require authentication. The format for the Authorization header is as follows:

`Authorization: Bearer <JWT>`

## Task Api 


# Create a Task

Request
`-` Endpoint: POST `/api/user/task `
Headers:
Content-Type: application/json
Authorization: Bearer <TOKEN>
Body:

`{
  "name": "Task 1",
  "description": "This is task 1.",
  "status": "pending" (not required)
}`

Response
Status code: 201 Created
Body:

`{
  "_id": "60c0fb2a2d434d8c84e54d28",
  "name": "Task 1",
  "description": "This is task 1.",
  "status": "pending",
  "user": "60c0f9e12d434d8c84e54d27",
  "createdAt": "2023-04-19T12:05:38.276Z",
  "updatedAt": "2023-04-19T12:05:38.276Z"
}`


# Get All Tasks

Request
`-` Endpoint: GET `/api/user/task`
Headers:
Authorization: Bearer <TOKEN>
Response
Status code: 200 OK
Body:

`[
  {
    "_id": "60c0fb2a2d434d8c84e54d28",
    "name": "Task 1",
    "description": "This is task 1.",
    "status": "pending",
    "user": "60c0f9e12d434d8c84e54d27",
    "createdAt": "2023-04-19T12:05:38.276Z",
    "updatedAt": "2023-04-19T12:05:38.276Z"
  },
  {
    "_id": "60c0fb772d434d8c84e54d29",
    "name": "Task 2",
    "description": "This is task 2.",
    "status": "completed",
    "user": "60c0f9e12d434d8c84e54d27",
    "createdAt": "2023-04-19T12:06:47.089Z",
    "updatedAt": "2023-04-19T12:07:22.975Z"
  }
]`


# Get a Task

Request
`-`Endpoint: GET `/api/user/task/:id`
Headers:
Authorization: Bearer <TOKEN>
Response
Status code: 200 OK
Body:

`{
  "_id": "613afbf82a1a7929bcff72aa",
  "name": "Finish assignment",
  "description": "Complete the RESTful API assignment for Todo App.",
  "status": "pending",
  "user": "613afbda2a1a7929bcff72a9",
  "createdAt": "2021-09-09T10:45:28.694Z",
  "updatedAt": "2021-09-09T10:45:28.694Z",
  "__v": 0
}`


# Update Task

Request
`-` Endpoint: PUT `/api/user/task/:id`
Headers:
Authorization: Bearer <TOKEN>
Body:

`{
"name": "Updated Task Name",
"description": "Updated Task Description",
"status": "completed"
}`

Response
Status code: 200 OK
Body:

`{
"_id": "6142a8768d92d100c4dc1a25",
"name": "Updated Task Name",
"description": "Updated Task Description",
"status": "completed",
"userId": "613dc650c8e87b0011a05a12",
"createdAt": "2021-09-16T17:22:46.034Z",
"updatedAt": "2021-09-16T17:23:07.245Z",
"__v": 0
}`

# Delete a Task

Request
`-` Endpoint: DELETE `/api/user/task/:id`
Headers:
Authorization: Bearer <TOKEN>
Response
# Status code: 204 No Content


# The TODO API devloped By <Saurabh Dixit >

