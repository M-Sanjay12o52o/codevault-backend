import express, { NextFunction, Request, Response, Router } from 'express';
import judgeORoutes from './routes/judgeo';
import taskRoutes from './routes/tasks';
import resultRoutes from './routes/result'
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
    origin: 'https://codevault-8imw95h0m-sanjays-projects-82890627.vercel.app/'
}));
app.use('/judgeo', judgeORoutes);
app.use('/result', resultRoutes)
app.use('/tasks', taskRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

// error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});