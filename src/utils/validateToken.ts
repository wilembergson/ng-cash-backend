import jwt, { JwtPayload } from "jsonwebtoken"

import ErrorMessage from "../utils/errorMessage.js"

export default function validateToken(authorization:string){
    const token = authorization?.replace("Bearer", "").trim()
    jwt.verify(token, process.env.JWT_SECRET, function(err) {
      if(err) ErrorMessage(401, "Sua sessão expirou! Faça o login novamente.") 
    })
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    return payload
}