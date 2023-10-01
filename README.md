# Star Wars Universe NestJS API

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Quick Start

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/lniklison/star-wars-universe-api
   cd star-wars-universe-api
   ```

2. **Build and Run the App with Docker Compose**:
    
    ```bash
    docker-compose build
    docker-compose up
    ```

3. **Access the API**:
 The API will be available at: http://localhost:3000


4. **Swagger Url**:
 http://localhost:3000/api/docs#/

# Available Endpoints

## Starships

1. **Create a Starship**
   - Method: `POST`
   - Endpoint: `/starship`
   - Body:
     ```json
     {
       "name": "Millennium Falcon",
       "maxSpeed": 1050,
       "crewMembers": 5,
       "type": "Freighter"
     }
     ```

2. **Retrieve All Starships**
   - Method: `GET`
   - Endpoint: `/starship`

3. **Retrieve a Specific Starship**
   - Method: `GET`
   - Endpoint: `/starship/:id`

4. **Update a Starship**
   - Method: `PATCH`
   - Endpoint: `/starship/:id`
   - Body:
     ```json
     {
       "name": "Modified Millennium Falcon"
     }
     ```

5. **Delete a Starship**
   - Method: `DELETE`
   - Endpoint: `/starship/:id`

6. **Calculate Distance for a Starship to a Planet**
   - Method: `GET`
   - Endpoint: `/starship/:id/distance/:planetId`

7. **Get Nearby Enemies for a Starship**
   - Method: `GET`
   - Endpoint: `/starship/:id/enemies/:range`

8. **Generate a Random Enemy for a Starship**
   - Method: `POST`
   - Endpoint: `/starship/:id/generateEnemy`

9. **Get the reachable planets for a starship**
   - Method: `GET`
   - Endpoint: `/starship/:id/reachablePlanets`

## Characters

1. **Create a Character**
   - Method: `POST`
   - Endpoint: `/character`
   - Body:
     ```json
     {
       "name": "Luke Skywalker",
       "species": "Human",
       "originPlanet": "Tatooine"
     }
     ```

2. **Retrieve All Characters**
   - Method: `GET`
   - Endpoint: `/character`

3. **Retrieve a Specific Character**
   - Method: `GET`
   - Endpoint: `/character/:id`

4. **Update a Character**
   - Method: `PATCH`
   - Endpoint: `/character/:id`
   - Body:
     ```json
     {
       "name": "Luke Skywalker",
       "affiliation": "Jedi Order"
     }
     ```

5. **Delete a Character**
   - Method: `DELETE`
   - Endpoint: `/character/:id`

6. **Relocate a Character to a Planet**
   - Method: `PUT`
   - Endpoint: `/character/:id/planet`
   - Body:
     ```json
     {
       "planetId": 3
     }
     ```

7. **Board a Character onto a Starship**
   - Method: `PUT`
   - Endpoint: `/character/:id/board`
   - Body:
     ```json
     {
       "shipId": 1
     }
     ```

8. **Disembark a Character from a Starship**
   - Method: `PUT`
   - Endpoint: `/character/:id/disembark`

## Planets

1. **Create a Planet**
   - Method: `POST`
   - Endpoint: `/planet`
   - Body:
     ```json
     {
       "name": "Tatooine",
       "climate": "Arid",
       "population": 200000
     }
     ```

2. **Retrieve All Planets**
   - Method: `GET`
   - Endpoint: `/planet`

3. **Retrieve a Specific Planet**
   - Method: `GET`
   - Endpoint: `/planet/:id`

4. **Update a Planet**
   - Method: `PATCH`
   - Endpoint: `/planet/:id`
   - Body:
     ```json
     {
       "population": 210000
     }
     ```

5. **Delete a Planet**
   - Method: `DELETE`
   - Endpoint: `/planet/:id`



## Installation Without Docker

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Considerations

```bash
- For the Traveling capability point I added a property to the starship called autonomy, this determines how far it can travel.
- Need to add more unit tests
- Need to add better documentation in swagger
```