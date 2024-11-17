import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import next from 'next';
import { resolve } from 'path'
import dotenv from 'dotenv'
dotenv.config({path: resolve(__dirname, '../../.env')})
import { env } from '@lyricsfluencer/env'
import apiRoutes from './routes/api'
import paymentRoutes from './routes/payment'

const PORT = env.PORT || 3000;
const dev = env.NODE_ENV !== 'production';

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

try {
    (async () => {
        await nextApp.prepare()
        const server = express();

        server.use(cors({ origin: env.ROOT, credentials: true }));
        server.use(cookieParser());
        server.use(express.json());

        server.use('/payment', paymentRoutes)
        server.use('/api', apiRoutes);

        // give all request to Nextjs server
        server.get('/_next/*', (req, res) => {
            handle(req, res);
        });
        

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(PORT, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${PORT}`);
        });

    })()

} catch(e) {
    console.error(e.stack);
    process.exit(1);
};

    
    
