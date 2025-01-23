import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// const key =
//"postgresql://neondb_owner:npg_r8Ro4SlNeYJp@ep-raspy-block-a9e4jozh.gwc.azure.neon.tech/Ai-generator?sslmode=require";
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
export const db = drizzle({ client: sql });
