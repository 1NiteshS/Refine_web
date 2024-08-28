import { DataProvider } from "@refinedev/core";
import simpleRestDataProvider from "@refinedev/simple-rest";

// Define the API URLs
const API_URL = "https://api.fake-rest.refine.dev";

// Create a data provider instance using the default export
const dataProvider: DataProvider = simpleRestDataProvider(API_URL);

export { dataProvider };
