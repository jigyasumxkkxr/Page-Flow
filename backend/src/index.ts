import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'
import { userRoute } from './routes/user'
import { blogRoute } from './routes/blog'
import { cors } from 'hono/cors'




neonConfig.webSocketConstructor = ws


const app = new Hono()
app.use("/*",cors())

app.route("/api/v1/user", userRoute)
app.route("/api/v1/blog", blogRoute)



export default app
