import { Router,Request,Response } from "express";
const userRouter = Router();

userRouter.get('/', (req: Request, res: Response) => {
    res.send('Aquí va una lista de usuarios!');
});

userRouter.get('/:id', (req: Request, res: Response) => {
    res.send(`Aquí va el usuario con id ${req.params.id}`);
});

userRouter.post('/', (req: Request, res: Response) => { 
    res.send('Aquí va un nuevo usuario con id ${req.body.id}');
});
userRouter.patch('/:id', (req: Request, res: Response) => {
    res.send(`Se modifico el usuarioc con id: ${req.params.id}`);
});

userRouter.delete('/', (req: Request, res: Response) => {
    res.send(`Se eliminó al usuario con id: ${req.body.id}`);
});

export default userRouter;