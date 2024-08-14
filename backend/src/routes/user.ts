import { Hono } from "hono"
import { sign } from 'hono/jwt'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'
import { signinInput, signupInput } from "@jigyasumakkxr/medium-common"
neonConfig.webSocketConstructor = ws


export const userRoute = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	}
}>()

userRoute.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Invalid email or password"
        })
    }
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
        if (existingUser) {
            c.status(409); // Conflict status code
            return c.json({
                error: "An account with this email already exists"
            });
        }
          const user = await prisma.user.create({
              data: {
                  email: body.email,
                  password: body.password,
                  name: body.name
              }
          })
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
      const name  = body.name
        return c.json({ jwt, name });
      } catch(e) {
          c.status(500)
        return c.json({ error: "Internal Server Error" })
      }
  })
  
userRoute.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Invalid email or password"
        })
    }

    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    try {
          const user = await prisma.user.findFirst({
              where: {
                  email: body.email,
                  password: body.password
              }
          })
      if(!user) {
        c.status(403);
            return c.json({ error: "Invalid email and password combination" })
      }
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
      const name = user.name
        return c.json({ jwt, name });
      } catch(e) {
          c.status(500)
      return c.json({ error: "Internal Server Error" })
      }
  })
