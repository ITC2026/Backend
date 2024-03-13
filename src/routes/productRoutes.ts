import { Router, Request, Response } from 'express';

const productRouter: Router = Router();

productRouter.get('/', (req: Request, res:Response) => {
    res.send("Get a list of products");
});

productRouter.get('/:id', (req: Request, res:Response) => {
    let id = req.params.id;
    res.send(`Get a list of products ${id}`)
});

productRouter.post('/', (req: Request, res:Response) => {
    let id = req.body.id;
    let title = req.body.title;
    let price = req.body.price;
    res.send(`Create product ${id} - ${title} - ${price}`)
});

productRouter.delete('/', (req: Request, res:Response) => {
    let id = req.body.id;
    res.send(`Deleted ${id}`)
});

export default productRouter;