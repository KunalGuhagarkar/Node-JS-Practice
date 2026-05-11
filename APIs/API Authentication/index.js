// API Authentication

/*
  Types of API Authentication:
    0. No Authentication
    1. Basic Authentication
    2. API Key Authorisation
    3. Token Based Authentication
*/

/* 
  0. No Authentication
    Anyone can call the API without proving who they are. This is fine only for public data, because there is no protection.

    If your API has no authentication, the main thing you can do is protect it with other controls instead of login. That usually means limiting abuse, validating inputs, and exposing only truly public data.
*/

/*
  1. Basic Authentication
    The client sends a username and password with every request, usually in an Authorization: Basic ... header. It is simple, but not the best choice for modern apps because credentials are sent every time.

    Basic Authentication = send username and password with every request, and the server checks them each time.

    In Basic Auth, the browser or client takes username:password and Base64-encodes it before putting it in the Authorization header. The server then decodes it back to the original text and checks whether the credentials are correct.

    Example:
      If the username and password are:
        admin:1234
      
      Base64 turns it into something like:
        YWRtaW46MTIzNA==
      
        The server reverses that process and gets admin:1234 back.

    Base64 is only a format change, not a security feature. If someone intercepts it, they can decode it easily, which is why Basic Auth should always use HTTPS.
*/

/* 
  2. API Key Authorisation
    API Key Authorization means the API gives you a secret key, and you must send that key with each request to prove you’re allowed to use it. The API checks the key and only responds if it is valid.

    Simple idea

    Think of the API key like a special badge:
      - the server gives you the badge,
      - you show it every time you enter,
      - if the badge is valid, you get access.

    How it is sent

      An API key can be sent in:
        - a request header,
        - the query string,
        - or a cookie.

    A common header format is:
      X-API-Key: your-key-here

    Why it is used

      API keys help the server:
        - identify which client is making requests,
        - control usage,
        - apply rate limits,
        - and monitor access.

    Important note:
      API keys should be kept secret and used over HTTPS, because by themselves they are not a complete security system.
*/

/*
  3. Token Based Authentication

  Token-based authentication means the user logs in once, then gets a token to use on future requests instead of sending the password every time. The server checks that token and allows access only if it is valid.

  Simple flow
    1. User sends username and password.
    2. Server verifies them.
    3. Server gives back a token.
    4. User sends that token with later API requests.
    5. Server checks the token and responds.

  Why it is useful
    - The password is not sent on every request.
    - It is better for APIs and mobile apps.
    - It is commonly used with JWTs and bearer tokens.

  Easy example
  Authorization: Bearer <token>

  That token is like a temporary pass that proves the user already logged in.

  Short version
    Token-based authentication = login once, then use a token instead of your password for later requests.
*/

// Link for Practice -> https://secrets-api.appbrewery.com/

// REST API

// 0. No Authentication
/*
  GET /random
  Returns a random secret. No authentication is required.

  GET: https://secrets-api.appbrewery.com/random

  Output:
    {
      "id": 8,
      "secret": "I secretly binge-watch reality TV shows while pretending to be productive.",
      "emScore": 4,
      "username": "realitytvjunkie",
      "timestamp": "2023-06-25 19:03:57 utc"
    }
*/

/*
  POST /register
    Registers a new user. If the username is already taken, it will return an error.

    Request Body:
    {
      "username": "The username of the new user.",
      "password": "The password of the new user."
    }

    Example Request:
    POST https://secrets-api.appbrewery.com/register
    {
      "username": "Kunaladzzz",
      "password": "Kunalktg1311"
    }

    Example Response:
    {
      "success": "Successfully registered."
    }
*/

// 1. Basic Authentication
/*
  GET /all
  Returns all secrets, paginated. Basic authentication is required.

  Query Parameters:
  page: The page number to retrieve.
  
  Example Request:
  GET https://secrets-api.appbrewery.com/all?page=1

  In Postman -> Authorization
    Auth Type: Basic Auth
      username: 'Kunaladzzz'
      password: 'Kunalktg1311'
  
  Example Response:
  [
      {
        "id": "1",
        "secret": "This is a secret.",
        "emScore": 3,
        "username": "user123",
        "timestamp": "2022-10-01T12:34:56Z"
      },
      {
        "id": "2",
        "secret": "Another secret.",
        "emScore": 3,
        "username": "user123",
        "timestamp": "2022-10-02T10:11:12Z"
      }
      // ... more secrets ...
    ]

    In Postman -> Headers:
      Authorization (key) : Basic S3VuYWxhZHp6ejpLdW5hbGt0ZzEzMTE=

      When Decoded (Base 64): https://www.base64decode.org/
        Kunaladzzz:Kunalktg1311
*/

// 2. API Key Authorisation
/*
  Authorisation vs Authentication
  Authentication means proving who you are. Authorization means deciding what you’re allowed to do.

  Simple example:

  - Authentication: “Are you really Kunal?”

  - Authorization: “Can Kunal see this admin page?”

  In a website or API

  First the system checks your login details. If that succeeds, it then checks your permissions. So authentication comes first, authorization comes second.

  Easy way to remember

    - Authentication = identify yourself.

    - Authorization = get permission.

  Example:
  If you log into a bank app:

  - entering username and password is authentication.

  - being allowed to transfer money is authorization.

  So the short answer is: authentication confirms identity, authorization controls access.
*/

/*
  GET /generate-api-key
    Generates a new API key.

    Example Request:
    GET https://secrets-api.appbrewery.com/generate-api-key

    Example Response:
    {
      "apiKey": "generated-api-key"
    }
*/

/*
  GET /filter
    Returns a random secret with a particular embarrassment score or higher. API key authentication is required.

    Query Parameters:
    - apiKey: Your API Key generated from the /generate-api-key endpoint.
    - score: The minimum embarrassment score to filter by.

    Example Request:
    GET https://secrets-api.appbrewery.com/filter?score=5&apiKey=b886c845-9989-43aa-8c60-ea4a669bb587
    
    Example Response:
    [
        {
          "id": "1",
          "secret": "This is a secret with embarrassment score 5 or higher.",
          "emScore": 5,
          "username": "user123",
          "timestamp": "2022-10-01T12:34:56Z"
        },
        {
          "id": "2",
          "secret": "Another secret with embarrassment score 5 or higher.",
          "emScore": 7,
          "username": "user123",
          "timestamp": "2022-10-02T10:11:12Z"
        }
        // ... more secrets ...
      ]
*/

// 3. Token Based Authentication
/*
  POST /get-auth-token
  Generates an authentication token for a user. If the user does not exist or the password is incorrect, it will return an error.

  Request Body:
    {
      "username": "The username of the registered user.",
      "password": "The password of the registered user."
    }

  Example Request:
  POST https://secrets-api.appbrewery.com/get-auth-token

  {
    "username": "jackbauer",
    "password": "IAmTheBest"
  }

  Example Response:
  {
    "token": "generated-auth-token"
  }
*/

/*
  GET /user-secrets
  Returns all the secrets of the authenticated user. Bearer token authentication is required.

  Example Request:
  GET https://secrets-api.appbrewery.com/user-secrets

  Example Response:
  [
      {
        "id": "1",
        "secret": "This is a secret of the user.",
        "emScore": 3,
        "username": "user123",
        "timestamp": "2022-10-01T12:34:56Z"
      },
      {
        "id": "2",
        "secret": "Another secret of the user.",
        "emScore": 3,
        "username": "user123",
        "timestamp": "2022-10-02T10:11:12Z"
      }
      // ... more secrets ...
    ]

  GET /secrets/{id}
  Returns the secret with the specified ID. Bearer token authentication is required.

  URL Parameters:
  id: The ID of the secret to retrieve.

  Example Request:
  GET https://secrets-api.appbrewery.com/secrets/1

  Example Response:
  {
    "id": "1",
    "secret": "This is a secret.",
    "emScore": 3,
    "username": "user123",
    "timestamp": "2022-10-01T12:34:56Z"
  }

  POST /secrets
  Adds a new secret. Bearer token authentication is required.

  Request Body:
  {
    "secret": "This is a new secret.",
    "score": "Embarrassment score"
  }

  Example Request:
  POST https://secrets-api.appbrewery.com/secrets

  {
    "secret": "This is a new secret.",
    "score": "Updated embarrassment score"
  }

  Example Response:
  {
    "id": "3",
    "secret": "This is a new secret.",
    "emScore": 3,
    "username": "user123",
    "timestamp": "2022-10-03T08:15:00Z"
  }

  PUT /secrets/{id}
  Updates the content of the secret with the specified ID. Bearer token authentication is required.

  URL Parameters:
  id: The ID of the secret to update.

  Request Body:
  {
    "secret": "Updated secret content.",
    "score": 5
  }

  Example Request:
  PUT https://secrets-api.appbrewery.com/secrets/1

  {
    "secret": "Updated secret content",
    "score": "Updated embarrassment score"
  }

  Example Response:
  {
    "id": "1",
    "secret": "Updated secret content.",
    "emScore": 3,
    "username": "user123",
    "timestamp": "2022-10-01T12:34:56Z"
  }

  PATCH /secrets/{id}
  Partially updates the content of the secret with the specified ID. Bearer token authentication is required.

  URL Parameters:
  id: The ID of the secret to update.

  Request Body:
  {
    "secret": "Updated secret content",
    "score": "Updated embarrassment score"
  }

  Example Request:
  PATCH https://secrets-api.appbrewery.com/secrets/1

  {
    "score": 2
  }

  Example Response:
  {
    "id": "1",
    "secret": "Partially updated secret content.",
    "emScore": 3,
    "username": "user123",
    "timestamp": "2022-10-01T12:34:56Z"
  }

  DELETE /secrets/{id}
  Deletes the secret with the specified ID. Bearer token authentication is required.

  URL Parameters:
  id: The ID of the secret to delete.

  Example Request:
  DELETE https://secrets-api.appbrewery.com/secrets/1

  Example Response:
  {
    "message": "Secret with ID 1 has been deleted successfully."
  }
*/

