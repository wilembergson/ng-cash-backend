import { Request, Response } from "express"

import userService from "../service/userService.js"

export async function createUser(req:Request, res:Response){
    const user = req.body
    const result = await userService.create(user)
    return res.status(201).json(result)
}