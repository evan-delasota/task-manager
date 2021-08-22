require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/userRoutes');
const taskRouter = require('./routers/taskRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port' + port);
});

