import  {check, validationResult} from "express-validator"

export const validatorTodo = [
    check("title").exists().notEmpty().isLength({min:3, max:40}),
    check("content").exists(),
    check("user_id").exists().notEmpty().isString(),
    check("category_id").exists().notEmpty().isString(),
    check("status_id").exists().notEmpty().isString(),
    (request, response, next) => {
        try {
            validationResult(request).throw()
            return next()
        } catch(error) {
            response.status(403).send({errors : error.array()})
        }
    }
]
