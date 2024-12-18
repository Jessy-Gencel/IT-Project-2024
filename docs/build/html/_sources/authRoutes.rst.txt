Auth routes
===========

This section documents the routes related to the auth blueprint, which handles user authentication, including login, signup, and token refresh functionality.

- **URL Prefix**: /auth
- **Blueprint name**: auth

POST auth/login
---------------

- **Description**: Authenicates a user using their email and password.
- **Usage**: Login in an account
- **Request**: 
    - email: string
    - password: string
- **Response**: Returns a JSON object with the following tokens
    - each JSON contains:
        - access_token: string (JWT access token for authenticated API calls)
        - refresh_token: string (JWT token for obtaining a new access token)

POST auth/signup
----------------

- **Description**: Creates a new user.
- **Usage**: During user registration to save user credentials securely
- **Request**: Returns a JSON object with the following fields
    - each JSON contains:
        - email: string
        - password: string
- **Response**: Returns a success or error message

POST auth/refresh
-----------------

- **Description**: Refreshes the JWT access token using a valid refresh token.
- **Usage**: Used when the access token expires, allowing the user to obtain a new one without re-entering credentials
- **Request**: refresh_token
- **Response**: Returns one of the following responses in a JSON
    - access_token (returns a new access token)
    - Refresh token expired
    - Invalid refresh token
