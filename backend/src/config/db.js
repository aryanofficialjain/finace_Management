import { neon } from "@neondatabase/serverless";

import "dotenv/config";

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error("❌ Error: DATABASE_URL environment variable is not set!");
  console.error("Please create a .env file in the backend directory with:");
  console.error("DATABASE_URL=your_neon_database_connection_string");
  process.exit(1);
}

// Creates a SQL connection using our DB URL
export const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title  VARCHAR(255) NOT NULL,
      amount  DECIMAL(10,2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;

    console.log("✅ Database initialized successfully");
  } catch (error) {
    console.error("❌ Error initializing DB");
    if (error.cause?.code === "ENOTFOUND") {
      console.error("Network error: Could not connect to database server.");
      console.error("Please check:");
      console.error("1. Your DATABASE_URL is correct");
      console.error("2. You have internet connectivity");
      console.error("3. The database server is accessible");
    } else {
      console.error(error);
    }
    process.exit(1); // status code 1 means failure, 0 success
  }
}
