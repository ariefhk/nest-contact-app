# Contact API Spec

## Register Contact

Endpoint : POST /api/contacts

Headers :

- Authorization: Bearer generated_token_id

Request Body :

```json
{
  "first_name": "Arief Rachman",
  "last_name": "Hakim",
  "email": "arief@gmail.com",
  "phone": "0821212xxx"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Arief Rachman",
    "last_name": "Hakim",
    "email": "arief@gmail.com",
    "phone": "0821212xxx"
  }
}
```

Response Body (Error):

```json
{
  "errors": "User already registered"
}
```

## Get Contact

Endpoint : GET /api/contacts/:contactId

Headers :

- Authorization: Bearer generated_token_id

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Arief Rachman",
    "last_name": "Hakim",
    "email": "arief@gmail.com",
    "phone": "0821212xxx"
  }
}
```

Response Body (Error):

```json
{
  "errors": "Contact not found!"
}
```

## Update Contact

Endpoint : PATCH /api/contacts/:contactId

Headers :

- Authorization: Bearer generated_token_id

Request Body :

```json
{
  "data": {
    "first_name": "Arief Rachman",
    "last_name": "Hakim",
    "email": "arief@gmail.com",
    "phone": "0821212xxx"
  }
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Arief Rachman",
    "last_name": "Hakim",
    "email": "arief@gmail.com",
    "phone": "0821212xxx"
  }
}
```

Response Body (Error):

```json
{
  "errors": "Contact not found"
}
```

## Get Contacts

Endpoint : GET /api/contacts

Headers :

- Authorization: Bearer generated_token_id

Query Params :

- name : string, contact first name or contact last name optional
- phone : string, contact phone optional
- email : string, contact email optional
- page : number, default 1
- size : number, default 10

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Arief Rachman",
      "last_name": "Hakim",
      "email": "arief@gmail.com",
      "phone": "0821212xxx"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```
