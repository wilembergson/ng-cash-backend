import { Request, Response } from "express"

import authService from "../service/authService.js"

export async function login(req:Request, res:Response){
    const login = req.body
    const result = await authService.login(login)
    return res.status(200).send(result)
}