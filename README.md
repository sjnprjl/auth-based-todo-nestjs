<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Auth based `todo` app built on [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
$ npm install
```

## Configuration
Create `.env` file in your root directory. Configure the following environment variables.
```bash
NODE_ENV=development
JWT_SECRET=your-secret
JWT_EXPIRES_IN=1h
DB_USER=db-user
DB_PASSWORD=db-password
DB_NAME=database-name
DB_PORT=5432
DB_HOST=localhost
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```