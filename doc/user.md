# User API Spec

## Register User

Endpoint : POST /api/users/register

Request Body :

```json
{
  "username": "arief",
  "password": "rahasia",
  "name": "Arief Rachman Hakim"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "arief",
    "name": "Arief Rachman Hakim"
  }
}
```

Response Body (Error):

```json
{
  "errors": "Username already registered"
}
```

Response Body (Error):

```json
{
  "errors": [
    {
      "field": "username",
      "message": "Username is required"
    },
    {
      "field": "password",
      "message": "Password is required"
    },
    {
      "field": "name",
      "message": "Name is required"
    }
  ]
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "arief",
  "password": "rahasia"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "arief",
    "name": "Arief Rachman Hakim",
    "token": "session_id_generated"
  }
}
```

Response Body (Error):

```json
{
  "errors": "User not found!"
}
```

Response Body (Error):

```json
{
  "errors": [
    {
      "field": "username",
      "message": "Username is required"
    },
    {
      "field": "password",
      "message": "Password is required"
    }
  ]
}
```

## Get User

Endpoint : GET /api/users/login

Headers :

- Authorization: Bearer generated_token_id

Response Body (Success):

```json
{
  "data": {
    "username": "arief",
    "name": "Arief Rachman Hakim"
  }
}
```

Response Body (Error):

```json
{
  "errors": "User not found!"
}
```

Response Body (Error):

```json
{
  "errors": [
    {
      "field": "token",
      "message": "Token is required"
    }
  ]
}
```

## Update User

Endpoint : PATCH /api/users/current

Headers :

- Authorization: Bearer generated_token_id

Request Body :

```json
{
  "username": "arief", // optional
  "password": "rahasia", // optional
  "name": "Arief Rachman Hakim" // optional
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "arief",
    "name": "Arief Rachman Hakim"
  }
}
```

Response Body (Error):

```json
{
  "errors": "User not found  registered"
}
```

## Logout User

Endpoint : DELETE /api/users/current

Headers :

- Authorization: Bearer generated_token_id

Response Body (Success):

```json
{
  "data": true
}
```

Response Body (Error):

```json
{
  "errors": "User not found  registered"
}
```
