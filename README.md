# Sending email by connecting NodeJs & PostgreSQL

This project helps you to write backend using ExpressJs,NodeJs and PostgresSQL.It also makes use of express-validator to validate the emailId.It enables you to easily send emails to the required email by customising your own content for you email.

## What's needed

- Make sure you have [postgresql](https://www.postgresql.org/download/) installed on machine and [pgAdmin](https://www.pgadmin.org/download/) - postgresql management tool
- Make sure you have [node.js](https://nodejs.org/en/download/) installed

## Folder Structure

Within the download you'll find the following directories and files:
```
Connecting NodeJs & PostgreSQL
.
├──── app.js
├──── package.json
├── package-lock.json
├── .gitattributes
├── .gitignore
├── LICENSE
└── README.md
```
## Database Connections - PostgreSQL

Create Database and use the credentials at `connectionStrings`.

```
const { Client } = require('pg');
var connectionString = "postgres://postgres:postgres@localhost:5432/database";

const client = new Client({
    connectionString: connectionString
});
```

## Getting started

- Download the project’s zip
- Create table & insert some default value in PostgreSQL

```
CREATE TABLE Employee(
	id int not null,
	name text not null,
	rollnumber int not null
);

INSERT INTO Employee values(1,'John',1001);

```

- Type `npm install` in terminal/console in the source folder where `package.json` is located
- Type `node app.js` in terminal/console in the source folder where `app.js` is located
- server started on port 4000. (http://localhost:4000/) in default browser

