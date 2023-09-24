import express, { Response, Request } from 'express';
import { requestErrorHandler, successHandler } from '../responseHandler/index.js';
import { validate, validateDescription, validateIdObl, validateNameObl } from '../validationHandler/index.js';
import { Category } from '../types.js';

const category = express.Router();
const categoryList : Category[] = [
  {id:3001,name:"random",description:""},
  {id:3002,name:"Nönnönöö",description:""},
  {id:3003,name:"pft",description:""}
]

//get all categories

category.get(
  '/',
  (req: Request, res: Response) => {
    successHandler(
      req,
      res,
      categoryList,
      'Succesfully read all categories',
    );
  }
)

//get one category
category.get(
  '/:id',
  validateIdObl,
  [validate],
  
  (req: Request, res: Response) => {
    const id:number = Number(req.params.id);

    const matchingOnes = categoryList.filter(
        (value) => value.id === id
    );

    if(matchingOnes.length===1){
      successHandler(
        req,
        res,
        matchingOnes[0],
        "Succesfully read one category",
      );
    } else {
      requestErrorHandler(
        req,
        res,
        `No category found with id: ${id}`
      )
    }
        
    }
);

category.post(
  '/',
  validateNameObl,
  validateDescription,
  [validate],
  (req: Request, res: Response) => {
    const id:number = Number(req.body.id);

    successHandler(
      req,
      res,
      3004,
      `Succesfully updated category with id: ${id}`,
    );
  }
);

category.put(
  '/',
  validateIdObl,
  [validate],
  (req: Request, res: Response) => {
    const id:number = Number(req.body.id);

    successHandler(
      req,
      res,
      1,
      `Succesfully updated category with id: ${id}`,
    );
  }
);
category.delete(
    '/:id',
    validateIdObl,
    [validate],
    (req: Request, res: Response) => {
        const id:number = Number(req.body.id);

        successHandler(
            req,
            res,
            1,
            `Succesfully deleted category with id: ${id}`,
        );
    }
);
      
export default category;