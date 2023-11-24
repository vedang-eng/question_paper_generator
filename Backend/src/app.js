const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const router = require('../Router/appRouter');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`server is started at port ${port}`);
});
app.use(router);
