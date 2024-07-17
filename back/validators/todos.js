import  {check, validationResult} from "express-validator"

export const validatorTodo = [
    check("title").exists().notEmpty().isLength({min:3, max:16}),
    check("content").exists(),
    check("user_id").exists().notEmpty().isNumeric(),
    check("category_id").exists().notEmpty().isNumeric(),
    check("status_id").exists().notEmpty().isNumeric(),
    (request, response, next) => {
        try {
            validationResult(request).throw()
            return next()
        } catch(error) {
            response.status(403).send({errors : error.array()})
        }
    }
]
