# Unsplash Gallery

An application to view and favourite images from Unsplash using Prisma.io

## How to run

### Add environment configuration

backend/prisma/.env
```
DATABASE_URL="postgresql://postgres:example@localhost:5432/postgres?schema=public"
```

backend/.env
```
DOWNLOAD_DIR=./src/downloads
UNSPLASH_ACCESS_KEY={Add key here}
```

frontend/.env
```
REACT_APP_API_BASE_URL=http://localhost:8000
```

### Start the services

To provision the postgres db:

```
$ docker-compose up --build
``` 

### Apply prisma schema to the database

```
$ cd backend && npx prisma migrate up --experimental
```

### Start the server

```
$ npm run dev
```

### Start the client

In a new terminal run the following command to start the client:

```
$ cd ../frontend && npm install && npm run start
```

## Architecture

### Backend

- Postgres
- Express.js
- Typescript
- Prisma

### Frontend

- React (create-react-app)
- Typescript
- Material UI

## Design decisions

I chose to use Prisma as an "ORM" layer to ease the interaction with the database and speed up API development. I find the schema is a nice way to
map to a mental model. CRA on the frontend felt like the best choice because I wasn't looking to build a static site (Gatsby) or one that needed
to be Server side rendered (Next.js). A GraphQL API was something I was interested in implementing but I felt it really wasn't necessary for an
application of this size so I opted to not use it. If I had, using something like Nexus (framework) or type-graphql could have been appropriate
libraries to use. 

The frontend contains no state management libraries due to the limited requirements. I felt something like Redux was a too heavy and even the 
Context API was unnecessary since all the interactions were saved in the database and there wasn't really session state that needed to be 
shared between screens. That decision did lead to a ux bug though when favouriting an image on the Search page. The results on the page will 
not update so opening the modal a 2nd time will not have the updated list selection. One way to resolve this would be to refresh the photos 
cached locally, this would result in another call to the Unsplash api but I felt this was undesirable. Finding a shared transform of the results 
from Unsplash and the favourites returned from the database that could be used by both the Search and Favourites page would have been a nicer solution.

Future improvements include:
- Tests
- Authentication/authorization (or at least local storage)
- Animations
- Share lists with friends
- Lazy loading
- Error handling
- Unlimited scroll/pagination
