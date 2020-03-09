const express = require("express");
const { postgraphile } = require("postgraphile");
const WeatherSchemaExtensionPlugin = require("./weatherSchema");

const db_user = "";
const db_name = "hirokoyamaji";
const db_schema = "forum";
const port = process.env.PORT ? process.env.PORT : 4001;

const app = express();

app.use(
  postgraphile(
    process.env.DATABASE_URL ||
      `postgres://${db_user}:@localhost:5432/${db_name}`,
    db_schema,
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      enableCors: true,
      graphqlRoute: "/graphql",
      graphiqlRoute: "/graphiql",
      appendPlugins: [WeatherSchemaExtensionPlugin],
      async additionalGraphQLContextFromRequest(req) {
        return {
          weathers: req.weathers
        };
      }
    }
  )
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
