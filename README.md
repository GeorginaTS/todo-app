# toDo App

## Full stack application

### FRONTEND

Small app to keep tasks organized. Keep it simple 😊

Kan-ban desk with Drag and Drop.

Made with Vue 3 with Vite.

I have used:

- Tailwind to styling
- Vue router for routing
- Pinia to have 3 screens: categories, status and user data.

#### Routes

"/" - Login Page

"/register" - Register user view

"/auth" - Logged zone, verified user with token.Fetch with Authoritation Token

"/auth/:id" - Detail Task View

"/auth/profile" - User View with option to change password

<img src="./assets/img/captura-login.png" alt="Login view" width="30%">
<img src="./assets/img/captura-register.png" alt="Register view" width="30%">
<img src="./assets/img/captura-home.png" alt="Home view" width="30%">

<hr /><hr />

### BACKEND

For the backend I used express and mongoose.
For login and user validation I used JWT (JSON Web Token) and bcrypt to encrypt the passwords that are stored in the Mongo Atlas database.

#### Endpoints

```
"/api/users"
    POST  "/login" - Validate password with token and bcrypt
    GET   "/:id" - Response with all user information
    POST  "/auth" - Verification token and password
```

```
"/api/todos" - all routes Authorization with token
    GET "/" - Response with all tasks for user
    GET "/:id" - get one task
    POST "/" - Create new task, task info validation with express-validator
    PUT "/:id" - Update the task with id, , task info validation with express-validator
    PATCH "/:id" - Update status of task
    DELETE "/:id" - Delete task
```

```
"/api/categories"
    GET "/" - get all categories
```
```
"/api/status"
    GET "/" - get all status
```