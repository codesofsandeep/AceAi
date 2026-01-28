import sql from "./db.js";

(async () => {
  const result = await sql`SELECT 1`;
  console.log("Neon connected ✅", result);
})();
