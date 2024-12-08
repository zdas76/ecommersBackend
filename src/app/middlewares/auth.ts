import { NextFunction, Request, Response } from "express"
import { JwtHelpers } from "../../helpers/jwtHelpers"
import config from "../config"
import { Secret } from "jsonwebtoken"
import ApiErrors from "../errors/ApiErrors"
import { StatusCodes } from "http-status-codes"


const auth = (...roles: string[])=> {
    return async (req: Request & {user?: any}, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization
            if(!token){
                throw new ApiErrors(StatusCodes.UNAUTHORIZED, "Your ar not authorized!")
            }

            const verifiedUser = JwtHelpers.verifyToken(token, config.jwt.secret as Secret)
            req.user = verifiedUser;

            if(roles.length && !roles.includes(verifiedUser.role)){
                throw new ApiErrors(StatusCodes.FORBIDDEN, "Your ar not authorized!")
            }

            next()

        } catch (error) {
            next(error)
        }
    }
}

export default auth;