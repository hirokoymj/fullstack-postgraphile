const { makeExtendSchemaPlugin, gql } = require("graphile-utils");
const fetch = require("node-fetch");

const WeatherSchemaExtensionPlugin = makeExtendSchemaPlugin(build => ({
  typeDefs: gql`
    type Weather {
      id: ID!
      main: String
      description: String
      icon: String
    }
    extend type Query {
      weathers: [Weather]!
    }
  `,
  resolvers: {
    Query: {
      weathers: () => {
        return fetch(
          "https://samples.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=b1b15e88fa797225412429c1c50c122a15"
        )
          .then(res => res.json())
          .then(json => {
            const mappedData = json.list.map(data => {
              const { main, description, icon } = data.weather[0];

              return {
                id: data.dt,
                main,
                description,
                icon
              };
            });
            return mappedData;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
}));

module.exports = WeatherSchemaExtensionPlugin;
