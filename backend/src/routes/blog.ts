import { Hono } from "hono"
import { sign, verify } from 'hono/jwt'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'
import { createPostInput, updatePostInput } from "@jigyasumakkxr/medium-common"
neonConfig.webSocketConstructor = ws


export const blogRoute = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	},
    Variables : {
		userId: string
	}
}>()

blogRoute.use("/*", async (c,next) => {
    const jwt = c.req.header('Authorization')
    if(!jwt) {
        c.status(401);
		return c.json({ error: "unauthorized" })
    }
    const token = jwt.split(' ')[1]
    try {
        const payload = await verify(token, c.env.JWT_SECRET)
        if(!payload) {
            c.status(401);
            return c.json({ error: "unauthorized" })
        }
        if (typeof payload.id === 'string') {
            c.set('userId', payload.id);
        }
        else{
            c.status(401);
            return c.json({ error: "unauthorized" })
        }
    }catch(err) {
        c.status(401);
        return c.json({ error: "unauthorized" })
    }
    await next()
})

blogRoute.post("/", async (c) => {
    const userId = c.get('userId')
    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
    })
    return c.json({
		id: post.id
	})
    }catch(err){
        c.status(500)
        return c.json({
            error: "Server Error"
        })
    }
})

blogRoute.put("/", async (c) => {
    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    const userId = c.get('userId')
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})

    try {
        await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
			    content: body.content
            }
        })
        return c.text('updated post')
    }catch(err){
        c.status(500)
        return c.json({
            error : "Server Error"
        })
    }
})

blogRoute.get("/bulk", async (c) => {
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                author:{
                    select: {
                       name: true 
                    }
                }
            }
        })
        return c.json({posts})
    }catch(err){
        c.status(500)
        return c.json({
            error: "Not Found Such Post"
        })
    }
})

blogRoute.get("/my", async (c) => {
    const userId = c.get('userId')
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: userId 
            },
            select: {
                id: true,
                title: true,
                content: true,
                author:{
                    select: {
                       name: true 
                    }
                }
            }
        })
        return c.json({posts})
    }catch(err){
        c.status(500)
        return c.json({
            error: "Not Found Such Post"
        })
    }
})

blogRoute.get("/:id", async (c) => {
    const id = c.req.param("id")
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author:{
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json(post)
    }catch(err) {
        c.status(500)
        return c.json({
            error: "Not Found Such Post"
        })
    }
})

