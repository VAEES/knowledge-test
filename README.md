# Knowledge Test
#### (Node.js+Express+TypeORM+FluentValidator)

<br>

## How to start

Install ts-node globally:

```
npm install -g ts-node
```

Install all other dependencies:

```
npm i
```

Install desired databases to run the project (for example example, we're using sqlite):

```
npm install -g sqlite
```

## How to run

Is some cases, you will need to give 

# How to run (in production)

To run the application using docker, first you need to set some environment variables on your host (with diferent values):

```
KT_DB_USERNAME=kt-user
KT_DB_PASSWORD=senha1234@
KT_DB_NAME=kt-db
KT_DB_HOSTNAME=knowledge-test-db
KT_DB_PORT=3306
KT_DB_SYNCHRONIZE=true
KT_API_LOGGING=https://9d9d2191ds9a@ihdushd9213.ingest.sentry.io/3219381938124
```

We've created a docker environment to run the application. To run using docker, just run this command (with mysql database):

```
docker-compose up --build -d
```

## Architecture

For further information, click [here](ARCHITECTURE.md).

## Tests

For further information, click [here](TESTS.md).