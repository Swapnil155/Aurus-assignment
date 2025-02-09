import { Request } from 'express';
import config from './config';

interface CorsConfig {
    origin: string | boolean;
    credentials: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
}

export const corsOptions = (req: Request, callback: (err: Error | null, options?: CorsConfig) => void) => {
    const origin = req.header('Origin') || '';

    // Define allowed origins based on environment
    const allowedOrigins =
        config.env !== 'development'
            ? [`http://${req.hostname}`] // Production origins
            : ['http://localhost:5173']; // Development origins

    const corsConfig: CorsConfig = {
        origin: allowedOrigins.includes(origin) ? origin : false,
        credentials: true, // Allow cookies and credentials
    };

    // Apply additional security in production
    if (config.env === 'production') {
        corsConfig.sameSite = 'Strict'; // Prevent CSRF attacks
    }

    callback(null, corsConfig);
};
