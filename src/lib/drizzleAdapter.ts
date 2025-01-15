import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";

export default DrizzleAdapter(db);
