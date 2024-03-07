import express, { Request, Response} from 'express';
import dotenv from 'dotenv';
import { router, error } from './routes/api.js';

dotenv.config()
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Kúkaklumpur');
})
app.use(router);
app.use(express.json())

const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
