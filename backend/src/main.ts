import postgres from "postgres"
import process from "node:process"
import { Hono } from "hono"

const sql = postgres({
  host: "database",
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
})

const begin_with_timeout = (
  body: (sql: postgres.TransactionSql) => void | Promise<void>,
) => {
  return sql.begin(async (sql) => {
    await sql`set local transaction_timeout = '1s';`
    return await body(sql)
  })
}

sql.begin(async (sql) => {
  await sql`select 1;`
})

await sql`
  create table if not exists "sheets" ( sheet jsonb );
`
await sql`
  create index if not exists idxsheets ON sheets using gin ( sheet );
`

const app = new Hono()

app.get("/", async (c) => {
  const res = await begin_with_timeout(async (sql: postgres.TransactionSql) => {
    const res = await sql`select 6 as foo;`
    return res.at(0)
  })
  console.log(res)
  return c.text(res.foo)
})

Deno.serve(app.fetch)
