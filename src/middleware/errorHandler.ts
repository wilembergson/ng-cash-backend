import { Request, Response, NextFunction } from "express"

export default function errorHandler (error, req: Request, res: Response, next: NextFunction) {
  if(error.status && error.message){
    return res.status(error.status).json({error: error.message})
  }
  console.log(error)
  return res.status(500).json({error: 'Erro ao acessar o banco de dados.'})
}