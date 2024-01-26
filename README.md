# OpenAPI Workshp: example code

## Install openapi-generator

```
npm install @openapitools/openapi-generator-cli -g
```

## Getting started

- clone this repository
- install dependencies

```
npm install
```

- generate api package

```
openapi-generator-cli generate -g typescript-axios -o src/task-api -i openapi.json
```

- start BE

```
npm run start:be
```

- start FE (in another cli window)

```
npm run start:fe
```
