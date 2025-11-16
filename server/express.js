import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

// Import development environment setup for React serving
import devBundle from './devBundle'; 

// Import all application routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import educationRoutes from './routes/education.routes'; // Re-added
import projectRoutes from './routes/project.routes';     // Re-added
import contactRoutes from './routes/contact.routes';     // Added

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

// Run webpack setup in development mode (if devBundle exists)
devBundle.compile(app);

// Configure Express middleware
// Note: We prioritize the body-parser middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// Serve static assets (React build files)
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

// Mount routes
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', educationRoutes); // Register Education routes
app.use('/', projectRoutes);   // Register Project routes
app.use('/', contactRoutes);   // Register Contact routes

// Handle server-side errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message});
    } else if (err) {
        res.status(400).json({"error" : err.name + ": " + err.message});
        console.log(err);
    }
});

export default app;