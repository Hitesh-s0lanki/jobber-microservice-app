## Nx command for starting the monorepo

npx create-nx-workspace@latest --preset nest --name jobber-microservice-app --appName jobber-auth

nx build jobber-auth

## Configure GraphQL

npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql --save

## Generating Nest Code

nx g module src/app/users/users.ts

## Start the Server

nx serve jobber-auth

## Nestjs Validator Lib

npm i --save class-transformer class-validator

## Password Hashing Library

npm i --save bcryptjs
npm i --save-dev @types/bcryptjs

## Commit Hooks

npm i --save-dev husky lint-staged
npx husky init

## Run Test

nx test nestjs

## Config File

npm i --save @nestjs/config

## JWT Config

npm i --save @nestjs/jwt

## GraphQL Settings

"request.credentials": "same-origin"

## Passport Service

npm i --save passport-jwt @nestjs/passport passport
npm i --save-dev @types/passport-jwt

## Discovery library

npm i --save @golevelup/nestjs-discovery
