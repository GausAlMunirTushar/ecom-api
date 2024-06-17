import app from './app';
import ENV from './config/env';
import { healthCheck } from './controllers/healthController';

const { PORT } = ENV;

// Home route
app.get('/', (_req, res) => {
	res.send('Hello World');
});

// Health check endpoint
app.get('/health', healthCheck);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
