// import { connect } from "@utils/dbConnect";

// let clientPromise;

// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     global._mongoClientPromise = connect();
//   }
//   console.log("development");
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.

//   clientPromise = connect();
// }

// export default clientPromse;

import { MongoClient } from "mongodb";
import { MongoClientOptions } from "mongoose/node_modules/mongodb";

const uri = process.env.DATABASE_URL as string;
// const options: MongoClientOptions = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// };

let client;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
