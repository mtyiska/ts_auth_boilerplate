import express from 'express';
import "reflect-metadata";
import {graphqlHTTP} from 'express-graphql';
import {createConnection} from "typeorm";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { schema, root } from './api/schema';


dotenv.config();

createConnection().then(async () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  app.use(process.env.GRAPHQL_PATH!, graphqlHTTP((request, response) => ({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: {
      req: request,
      res: response,
    }
  })));


  app.listen(parseInt(process.env.APP_PORT!));
  console.log(`🚀 Server ready at http://localhost:${process.env.APP_PORT!}${process.env.GRAPHQL_PATH}`)



}).catch((err)=> console.log(err.message))




