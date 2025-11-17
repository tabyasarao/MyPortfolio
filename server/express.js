// server/express.js
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

// Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import educationRoutes from './routes/qualification.routes.js';
import projectRoutes from './routes/project.routes.js';
import contactRoutes from './routes/contact.routes.js';

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// Serve React build
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

// Mount routes
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', educationRoutes);
app.use('/', projectRoutes);
app.use('/', contactRoutes);

// Error handler
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: `${err.name}: ${err.message}` });
    } else if (err) {
        res.status(400).json({ error: `${err.name}: ${err.message}` });
        console.error(err);
    }
});

export default app;
