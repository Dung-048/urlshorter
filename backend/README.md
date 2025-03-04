# Urlshorter BE

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
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

## Development

```bash
# Generate resource
nest g resource modules/users --no-spec
```

```bash
# create new migration
npm run migration:migrate src/database/migrations/AddUser

# apply pending migrations
npm run migration:run

# start the app
npm run start
```

### Export keycloak data

```bash
/opt/keycloak/bin/kc.sh export --dir /opt/keycloak/data/import --realm urlshorter --users realm_file
```

