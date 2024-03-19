import { Router, Request, Response } from 'express';

const positionRouter: Router = Router();

positionRouter.get('/', (req: Request, res: Response) => {
  res.send('Get a list of positions');
});

positionRouter.get('/:id', (req: Request, res: Response) => {
  res.send(`Get the position ${req.params.id}`);
}); 
  
positionRouter.get('/', (req: Request, res: Response) => {
  res.send(`Create a new position with ID: ${req.body.id}`)
})
positionRouter.patch('/:id', (req: Request, res: Response) => {
  res.send(`Update position with ${req.params.id} with the values of ${req.body.title} and  ${req.body.description}`);
});

positionRouter.delete('/', (req: Request, res: Response) => {
  res.send(`Deleted position ${req.body.id}`);
});

export default positionRouter;
