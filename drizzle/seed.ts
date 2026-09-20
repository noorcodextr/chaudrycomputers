import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "../drizzle/db";
import { admins } from "../drizzle/schema";

async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !email || !password) {
    throw new Error(
      "ADMIN_USERNAME, ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env"
    );
  }

  if (password.length < 8) {
    throw new Error("Admin password must be at least 8 characters long");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.insert(admins).values({
    username,
    email,
    passwordHash,
  }).onConflictDoNothing();

  console.log("✅ Admin account created successfully");
  console.log(`Username: ${username}`);
  console.log(`Email: ${email}`);
}

seedAdmin().catch((error) => {
  console.error("❌ Failed to create admin:", error);
  process.exit(1);
});