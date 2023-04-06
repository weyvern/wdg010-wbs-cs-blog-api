# WD016 Blog (backend)

![WBS Coding School](https://mlsf03rmjfdn.i.optimole.com/fVWTwdQ.Z_5R~130ed/w:auto/h:auto/q:90/https://www.wbscodingschool.com/files/WBS_CODING_SCHOOL_logo.svg)

## Install

- Fork project
- Clone your fork:

```bash
git clone <link-to-project>
cd <project-directory>/
npm install
```

## Environment

The app needs the following environment variables

- MONGO_URI=MongoDB connection string

# Commands

## Dev

Dev commands runs app with Node and the experimental flag --watch, you will need Node 18.11+

```bash
npm run dev
```

## Start

Start commands runs app with Node

```bash
npm start
```

# API routes and methods

Check the `WBS CS Blog API.postman_collection` file. You can import it in Postman to have an interface to the API. You will need to create an [enviroment variable](https://learning.postman.com/docs/sending-requests/variables/) called `WBS_CS_BLOG_API` with value equal to the path where your backend API is running, e.g. `http://localhost:8000`

# Requirements 📝

You are taske with implementing authentication in order to:

- Only allow blog posts creation to authenticated users
- Only allow blog post edition to authenticated users when the user is the owner of the post
- Only allow blog post deletion to authenticated users when the user is the owner of the post
- Reading endpoints on the post resource (all and single) are public

# Hints 💡

- You will need three endpoints:
-- `POST` /auth/signup => takes a body with `firstName`, `lastName`, `email` and `password` and returns a JWT with the user ID as the payload
-- `POST` /auth/signin => takes a body with `email` and `password` and returns a JWT with the user ID as the payload
-- `GET` /auth/me => takes no body but an `authorization` header is present, the value of said header is a valid JWT
- Implement a `router` in the `routes` director for `auth`
- Implement a `controller` in the `controllers` directory for users
- Implement an `User` model in the `models` directory
- Implement a `verifyToken` middleware that will inspect the `authorization` header of a request and validate a token. We will use this middleware to protect private routes!
- You have some utilities at your disposal: 
--`asyncHandler` => it takes an async function and follows the resolution of the promise, catches errors and passes them to `next` if necessary
--`ErrorResponse` => a custom class that extends the native `Error` class, you can create errors with HTTP status codes and throw them for a cleaner error handling experience
--`validateJOI` => a custom middleware that takes a valid [JOI schema](https://joi.dev/api/?v=17.9.1) for body validatation. You can check the available schemas at `joi/schemas.js` and a sample use case in `routes/postsRouter.js`

# Careful! ⚠️

- Hash the password using a library like `bcrypt` before inserting in the database!
- Do NOT return the password in the `auth/me` endopoint
- You can return the token as a cookie or in the body and then store it in browser storage, both have their pros and cons


