const db = require("./server/db/db");
const { Company } = require("./server/db/models");
const fs = require("fs");
const [data] = require("./No_ID_MOCK_DATA");

async function seed() {
  await db.sync();
  console.log("db synced!");
  await Company.bulkCreate(data);
  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.

runSeed();

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
