import "@babel/polyfill";
import "dotenv/config";

import "#root/db/connection";
import "#root/server/startServer";

console.log(process.env.APPLICATION_NAME);
