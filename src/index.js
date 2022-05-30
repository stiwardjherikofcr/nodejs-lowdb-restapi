import app from "./app.js";
import { createConnection } from "./database.js";

createConnection();
app.listen(3000);
