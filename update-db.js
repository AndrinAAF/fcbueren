const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Adding content column...");
    await prisma.$executeRawUnsafe(`ALTER TABLE Event ADD COLUMN content TEXT NOT NULL DEFAULT '';`);
  } catch (e) {
    if (e.message.includes('duplicate column name')) {
      console.log("Column content already exists.");
    } else {
      console.error(e.message);
    }
  }

  try {
    console.log("Adding address column...");
    await prisma.$executeRawUnsafe(`ALTER TABLE Event ADD COLUMN address TEXT;`);
  } catch (e) {
    if (e.message.includes('duplicate column name')) {
      console.log("Column address already exists.");
    } else {
      console.error(e.message);
    }
  }
  
  console.log("Done.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
