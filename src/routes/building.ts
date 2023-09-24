import express, { Response, Request } from 'express';
import { requestErrorHandler, successHandler } from '../responseHandler/index.js';
import { validate, validateDescription, validateIdObl, validateNameObl } from '../validationHandler/index.js';
import { Building } from '../types.js';

const building = express.Router();
const buildingList : Building[] = [
  {id:3001,name:"random",description:""},
  {id:3002,name:"Nönnönöö",description:""},
  {id:3003,name:"pft",description:""}
]

//get all buildings
building.get(
  '/',
  (req: Request, res: Response) => {
    successHandler(
      req,
      res,
      buildingList,
      'Succesfully read the buildings from DB'
    );
        
    }
);

building.get(
  '/:id',
  validateIdObl,
  [validate],
  
  (req: Request, res: Response) => {
    const id:number = Number(req.params.id);

    const matchingOnes = buildingList.filter(
        (value) => value.id === id
    );

    if(matchingOnes.length===1){
      successHandler(
        req,
        res,
        matchingOnes[0],
        "Succesfully read one building",
      );
    } else {
      requestErrorHandler(
        req,
        res,
        `No building found with id: ${id}`
      )
    }
        
    }
);

building.post(
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
      `Succesfully updated building with id: ${id}`,
    );
  }
);

building.put(
  '/',
  validateIdObl,
  validateNameObl,
  [validate],
  (req: Request, res: Response) => {
    const id:number = Number(req.body.id);

    successHandler(
      req,
      res,
      1,
      `Succesfully updated building with id: ${id}`,
    );
  }
)
      
export default building;