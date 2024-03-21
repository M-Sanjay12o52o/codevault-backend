import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { db } from '../lib/db';
const axios = require('axios');

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { language, sourceCode, stdin } = (await req.body());

    let languageId: number = 0;

    if (language === "JavaScript") {
        languageId = 93
    } else if (language === "C++") {
        languageId = 76
    } else if (language === "Java") {
        languageId = 91
    } else if (language === "Python") {
        languageId = 92
    }

    console.log("languageId: ", languageId)

    if (!languageId) {
        return res.status(500).json({
            status: "error",
            message: "Unsupported Language",
        });
    }

    try {
        const sanitizedReq = {
            sourceCode,
            stdin,
        };

        const encodedSourceCode = Buffer.from(sanitizedReq.sourceCode).toString('base64');
        const encodedStdin = Buffer.from(sanitizedReq.stdin).toString('base64');

        const options = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {
                base64_encoded: 'true',
                fields: '*'
            },
            headers: {
                'content-type': 'application/json',
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': process.env.JUDGE_O_API,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            },
            data: {
                language_id: languageId,
                source_code: encodedSourceCode,
                stdin: encodedStdin
            }
        };

        try {
            const response = await axios.request(options);
            const responseData = response.data;
            const responseDataString = JSON.stringify(responseData)

            return res.json(responseDataString);
        } catch (error: any) {
            console.error('Error submitting snippet:', error);

            return res.status(500).json({
                status: "error",
                message: "An error occurred. Please check the server logs for details."
            });
        }
    } catch (error: any) {
        console.error('Error submitting snippet:', error);

        return res.status(500).json({
            status: "error",
            message: error.message,
        });

    } finally {
        await db.$disconnect();
    }
})

router.get("/", async (req: Request, res: Response) => {
    const token = req.query.token as string;

    console.log("token backend: ", token)

    if (!token) {
        // Handle missing token error

        return res.status(401).json({
            status: "error",
            message: "Missing token",
        });
    }

    try {
        const options = {
            method: 'GET',
            url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
            params: {
                base64_encoded: 'true',
                fields: '*'
            },
            headers: {
                'X-RapidAPI-Key': process.env.JUDGE_O_API,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const responseData = response.data;
            const responseDataString = JSON.stringify(responseData)

            return res.json(responseDataString)
        } catch (error) {
            console.error(error);
        }
    } catch (error: any) {
        console.error('Error submitting snippet:', error);
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    } finally {
        await db.$disconnect();
    }
})

export default router;