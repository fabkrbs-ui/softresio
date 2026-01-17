import postgres from "postgres";
import process from "node:process";

const sql = postgres({
  host: "database",
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
});

await sql`
  create table if not exists "sheets" ( sheet jsonb );
`;
await sql`
  create index idxsheets ON sheets using gin ( sheet );
`;

Deno.serve((_req) => {
  return new Response("Hello, World!");
});
