import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { db } from '../lib/db';
const axios = require('axios');

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { username, title, description, codeLanguage, stdin, sourceCode } = (await req.body);

        const snippet = await db.codeSnippet.create({
            data: {
                username,
                title,
                description,
                codeLanguage,
                stdin,
                sourceCode,
            },
        });

        const successMessage = 'Code snippet submitted successfully!';
        return res.json({
            snippet,
            message: successMessage
        });
    } catch (error: any) {
        console.error('Error submitting snippet:', error);
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
})

router.get("/", async (req: Request, res: Response) => {
    try {
        const snippets = await db.codeSnippet.findMany();

        const successMessage = 'Code snippets fetched successfully!';
        return res.json({
            snippets,
            message: successMessage
        });
    } catch (error: any) {
        console.error('Error submitting snippet:', error);
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
})

export default router;