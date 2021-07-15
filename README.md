# Contractify

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Provides tools to create and implement REST API contracts.

[Changelog](CHANGELOG.md) | [License](LICENSE.md)

## Usage

```typescript
// Create a contract using the API facade
const User = {
  // Create a new user
  Create: API
    .post('/users')
    .requestBody<DeepPartial<User>>()
    .returns<User>,
  // Get a specific user by id
  Get: API
    .get('/users/:id')
    .pathParameters<{ id: string }>
    .returns<User>,
  // Update a specific user by id
  Update: API
    .patch('/users/:id')
    .pathParameters<{ id: string }>
    .requestBody<DeepPartial<User>>()
    .returns<User>,
  // Delete all users by email
  Delete: API
    .delete('/users')
    .queryParameters<{ email: string, name: string }>()
    .returns<void>
};

// The resulting contract objects look like this
User.Create = {
  method: HttpMethod.Post,
  body: DeepPartial<User>,
  result: User
};

User.Get = {
  method: HttpMethod.Get,
  pathParameters: { id: string },
  result: User
};

User.Update = {
  method: HttpMethod.Patch,
  pathParameters: { id: string },
  body: DeepPartial<User>,
  result: User
};

User.Delete = {
  method: HttpMethod.Delete,
  queryParameters: { email: string },
  result: void
};
```

## Contract Functions

The contract function factory creates contract functions out of api contracts and any http client.

```typescript
// Create a factory with your http client
const factory = new ContractFunctionFactory(...HttpClient...);

// Create the contract function
const getUser = factory.create(Contracts.User.Get);

// Call the function enforcing the contract
const user = await getUser({ id: '... id ...' }).toPromise();
```

The contract function factory takes some optional arguments.

```typescript
const options = {
  /**
   * Http client to use for underlying requests
   */
  httpClient: HttpClient<REQUEST_OPTIONS>,
  /**
   * Default options that will be set on every request
   */
  defaultOptions?: REQUEST_OPTIONS,
  /**
   * Default base url that will be set on every request
   */
  baseUrl?: string,
  /**
   * The key to set the query parameters, defaults to 'params'
   */
  queryParameterKey?: keyof REQUEST_OPTIONS
};
```

The contract funtion factory works with every http client that looks like the following out of the box:

```typescript
export interface HttpClient<REQUEST_OPTIONS> {
  /**
   * Execute a get request
   */
  get: (url: string, options?: REQUEST_OPTIONS) => any;
  /**
   * Execute a delete request
   */
  delete: (url: string, options?: REQUEST_OPTIONS) => any;
  /**
   * Execute a patch request
   */
  patch: (url: string, body?: any, options?: REQUEST_OPTIONS) => any;
  /**
   * Execute a post request
   */
  post: (url: string, body?: any, options?: REQUEST_OPTIONS) => any;
  /**
   * Execute a put request
   */
  put: (url: string, body?: any, options?: REQUEST_OPTIONS) => any;
}
```

## API Helper

For more control over the function creation, the ApiHelper provides some utilites

```typescript
// Extract parameters out of function arguments
const [
  pathParameters,
  queryParameters,
  requestBody,
  options,
] = ApiHelper.extractApiParameters(api, ...args);

// Construct route path and inject path parameters
const path = ApiHelper.constructApiPath(api.path, pathParameters);

// Check if contract uses body method
if (ApiHelper.isRequestBodyApi(api)) { ... }

// Check if contract uses query parameters
if (ApiHelper.isQueryParameterApi(api)) { ... }
```

## Duplicate Protection

Contractify keeps track of all the contracts you create and throws an error if a contract gets created twice. Contracts are seen as duplicates if they share the same route path and method, for example:

```typescript
const User = {
  Delete: API.delete('/users/:id').returns<void>
};
const Profile = {
  Profile: API.delete('/users/:id').returns<void>
};
```

## Troubleshooting

My query parameters dont get injected?
> Set the queryParameterKey in the contract function factory options to the one your http client is using.
