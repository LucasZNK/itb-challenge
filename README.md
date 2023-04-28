# Into The Blocks Challenge
This project consists of a frontend and a backend that run in Docker containers. The frontend is called "frontend-into" and the backend is called "backend-into".

## Technologies Used
The project uses the following technologies:

Docker
Node.js
NestJS (Backend)
Next.js (Frontend)
PostgreSQL (Database)
Apollo Client (Frontend)
GraphQL (Frontend and Backend)
Typescript (Frontend and Backend)

## Prerequisites
To run the project, make sure you have Docker installed on your machine.

## Installation Instructions
   1. Clone this repository to your local machine.

   2. Navigate to the project folder and run the following command:

```
docker compose up
```
This will create and run Docker containers for the frontend, backend, and database.

Once the containers are up and running, the frontend will be available at http://localhost:3000 and the backend at http://localhost:4000.
Project Structure
The project is divided into two main parts: frontend and backend.

## Frontend (frontend-into)
The frontend is built with Next.js and uses Apollo Client for communication with the backend. Additionally, it uses Chart.js for creating charts and React Icons for icons. The GraphQL Codegen configuration is located in codegen.yml.

## Backend (backend-into)
The backend is built with NestJS and uses GraphQL for communication with the frontend. Additionally, it uses TypeORM for connecting to the PostgreSQL database and the NestJS Schedule module for scheduled tasks. Dependency packages can be found in package.json.

## Docker
The project uses Docker Compose to build and run containers for the frontend, backend, and database. The configuration is located in docker-compose.yml. The Dockerfile files can be found in the frontend and backend folders.

## Ports
By default, Docker maps the following ports:

- Frontend: `3000`
- Backend: `4000`
- Database: `5432` (mapped to `5478` on the host)

If you need to change a port because it's already in use, update the corresponding port mapping in the docker-compose.yml file.

For example, if you want to change the frontend port from `3000` to `8080`, update the following line:

```
- '3000:3000'
```
to:

```
- '8080:3000'
```

# Running Without Docker
If you prefer not to use Docker, you can run the frontend, backend, and PostgreSQL database separately. Follow the steps below for each component.

 ##Prerequisites
Node.js installed on your machine
A PostgreSQL database with a table named snapshots

##Backend

1. Set up a .env file in the backend-into folder with the following content:

```
DB_HOST='localhost'
DB_PORT=5432
DB_USER='postgres'
DB_PASS='1234'
DB_NAME='snapshots'
```
Replace the values with your PostgreSQL database connection details.

2. Navigate to the backend-into folder and run the following commands:

```
npm install
npm run build
npm run start:prod
```
This will install the dependencies, build the backend, and start it on port 4000.

## Frontend
1. Navigate to the frontend-into folder and run the following commands:
```
npm install
npm run build
npm run start
```
This will install the dependencies, build the frontend, and start it on port 3000.

# PostgreSQL Database
Make sure you have a PostgreSQL database running on your machine.

Create a table named snapshots with the required schema.

Update the .env file in the backend-into folder with your PostgreSQL database connection details.

With the backend, frontend, and PostgreSQL database running, you can now access the frontend at `http://localhost:3000` and the backend at `http://localhost:4000`.

License
This project is unlicensed and open source.#
