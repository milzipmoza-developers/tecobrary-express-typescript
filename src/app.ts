import {libraryBookRouterFactory} from "./librarybook/router/libraryBookRouterFactory";
import {userRouterFactory} from './user/router/userRouterFactory';
import {naverApiRouterFactory} from './common/router/naverApiRouterFactory';
import {serialRouterFactory} from "./serial/router/serialRouterFactory";
import {wishBookRouterFactory} from "./wishbook/router/wishBookRouterFactory";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

export const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome Tecobrary Api v1');
});

app.use(userRouterFactory());
app.use(libraryBookRouterFactory());
app.use(serialRouterFactory());
app.use(wishBookRouterFactory());

app.use(naverApiRouterFactory());
