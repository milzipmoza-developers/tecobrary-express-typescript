const express = require('express');

const index = express();

index.get('/', (req: any, res: any) => {
    res.send('Hello World');
});

index.listen(8080, () => {
    console.log(`app listening on 8080 port`)
});