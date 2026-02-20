import app from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import { seedDefaultFlows } from './services/flowService.js';

const start = async () => {
  try {
    await connectDb();
    await seedDefaultFlows();

    app.listen(env.port, () => {
      console.log(`Backend running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
