"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
userRouter.get('/', (req, res) => {
    res.send('Aquí va una lista de usuarios!');
});
userRouter.get('/:id', (req, res) => {
    res.send(`Aquí va el usuario con id ${req.params.id}`);
});
userRouter.post('/', (req, res) => {
    res.send('Aquí va un nuevo usuario con id ${req.body.id}');
});
userRouter.patch('/:id', (req, res) => {
    res.send(`Se modifico el usuarioc con id: ${req.params.id}`);
});
userRouter.delete('/', (req, res) => {
    res.send(`Se eliminó al usuario con id: ${req.body.id}`);
});
exports.default = userRouter;
