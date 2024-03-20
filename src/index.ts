import express, { NextFunction, Request, Response, Router } from 'express';
import judgeORoutes from './routes/judgeo';
import taskRoutes from './routes/tasks';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use('/judgeo', judgeORoutes);
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