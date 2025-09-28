import { db, schemas } from "@raypx/db";

export async function GET() {
  const start = Date.now();
  const data = await db.select().from(schemas.user);
  const end = Date.now();
  console.log(`Time taken: ${end - start}ms`);
  return Response.json(data);
}
