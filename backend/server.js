require("dotenv").config();
const port = process.env.PORT || 3000;
const app = require("./index");

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Handle server errors
server.on("error", (err) => {
    console.error(`cannot start server: ${err.message}`);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    server.close(() => process.exit(1));
});
