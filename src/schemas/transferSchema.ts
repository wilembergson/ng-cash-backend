import Joi from "joi"

type TranserData = {
    transferToName:string,
    amount:string
  }

export const transferSchema = Joi.object<TranserData>({
    transferToName: Joi.string().required(),
    amount: Joi.string().required()
})