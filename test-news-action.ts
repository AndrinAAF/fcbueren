import prisma from './src/lib/prisma';
import { getNewsPage } from './src/app/actions/news';

async function main() {
  try {
    console.log("Testing getNewsPage(2)...");
    const result = await getNewsPage(2);
    console.log("Result length:", result?.length);
    console.log("Result:", result);
  } catch (e) {
    console.error("Error:", e);
  }
}

main();
