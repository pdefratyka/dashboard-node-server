const express = require("express");
const cosmos = require("@azure/cosmos");
const proxy = require("express-http-proxy");
const cors = require("cors");

const publicweb = process.env.PUBLICWEB || ".";
const app = express();

const weatherApi = process.env.WEATHER_API || "http://api.weatherapi.com";
const exchangeApi = process.env.EXCHANGE_API || "www.ecb.europa.eu";
const stocksApi = process.env.STOCKS_API || "finnhub.io";

const port = process.env.PORT || "3000";

app.get('/', (req, res) => res.send('Hello world'));
app.listen(port, () => console.log(`API running on:${port}`));

// COSMOS DB

/*const CosmosClient = cosmos.CosmosClient;
const endpoint = "https://dashboardinfodb.documents.azure.com:443/";
const masterKey =
  "IS7nxMGZ1iThEQLNbSiLg0qVuq1MH0j9aJhDtPG6L003XbKHMwtugWXXomqut70LdQ52OiaHZw02ZT3dirX2EQ==";
const client = new CosmosClient(
  "AccountEndpoint=https://dashboardinfodb.documents.azure.com:443/;AccountKey=IS7nxMGZ1iThEQLNbSiLg0qVuq1MH0j9aJhDtPG6L003XbKHMwtugWXXomqut70LdQ52OiaHZw02ZT3dirX2EQ==;"
);
const databaseId = "information";
const containerId = "weather3";

const querySpec = {
  query: "SELECT * FROM c where",
};

cors({ credentials: true, origin: true });
app.use(cors());

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "example.com");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(allowCrossDomain);

app.use(cors());
app.options("*", cors());

async function getDataFromCosmosDb(city) {
  const { resources: items } = await client
    .database(databaseId)
    .container(containerId)
    .items.query({
      query: "SELECT * FROM c where UPPER(c.location.name)='" + city.toUpperCase() + "'"
    }, { enableCrossPartitionQuery: true })
    .fetchAll();
  return items[0];
}

app.use(express.static(publicweb));
app.use("/api/weather", proxy(weatherApi));
app.use(
  "/api/exchange",
  proxy(exchangeApi, {
    https: true,
  })
);
app.use(
  "/api/stocks",
  proxy(stocksApi, {
    https: true,
  })
);

app.get("/cosmos", (req, res) => {
  getDataFromCosmosDb(req.query.city).then(a => {
    res.send(a);
  });
});

app.get("/admin", (req, res) => {
  res.send(
    `PORT: ` +
    port +
    `<br>WEATHER_API: ` +
    weatherApi +
    `<br>EXCHANGE_API: ` +
    exchangeApi +
    `<br>STOCKS_API: ` +
    stocksApi
  );
});

app.get("*", (req, res) => {
  res.sendFile(`index.html`, { root: publicweb });
});

app.listen(port, () => console.log(`API running on localhost:${port}`));

//getDataFromCosmosDb();
*/