// prisma/seed.ts
import { prisma } from "../src/lib/prisma.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL dan ADMIN_PASSWORD harus diisi di file .env");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email: email },
    update: {},
    create: {
      username: "AdminSuper",
      email: email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Seeding berhasil untuk:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
