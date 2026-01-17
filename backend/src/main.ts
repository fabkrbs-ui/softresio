import postgres from "postgres"
import process from "node:process"
import { Sheet, Raid } from "../types/types.ts"
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
  create table if not exists "raids" ( raid jsonb );
`

await sql`
  create index if not exists idxraids ON raids using gin ( raid );
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

app.get("/make_sample", async (c) => {
  const raid: Raid  = {
    sheet: {
      id: 'kxXhe',
      time: '2026-01-17T22:15:27.369Z',
      sr_plus_enabled: true,
      attendees: [
        {
          character: {
            name: "Aborn",
            class: "Warrior",
            spec: "Protection"
          },
          soft_reserves: [
            {
              item_id: 1933,
              sr_plus: 50,
              comment: null
            }
          ]
        }
      ]
    },
    secrets: {
      password_hash: "1234",
      access_token: "123"
    }
  }
  const res = await sql`insert into raids ${sql({ raid })};`
  return c.json(raid.sheet)
})

app.get("/:sheet_id", async (c) => {
  const sheet_id = c.req.param('sheet_id')
  const [{ sheet }]: [{ sheet: Sheet }] = await sql`select raid->'sheet' as sheet from raids where raid @> ${ {sheet: { id: sheet_id } }};`
  return c.json(sheet)
})

Deno.serve(app.fetch)
