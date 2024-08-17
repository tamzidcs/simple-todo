import app from './app';
import { initializeDatabase } from './api/v1/db/db';

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3005;

app.listen(port, async () => {
  console.log(`Server listening on http://${host}:${port}`);
  initializeDatabase();
});

