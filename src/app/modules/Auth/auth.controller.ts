import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponst from "../../../shared/sendResponst";
import { Authervices } from "./auth.service";
import { Request, Response } from "express";

const loginUser = catchAsync(async (req, res) => {
  const result = await Authervices.loginUser(req.body);

  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Logged in Successfully",
    data: {
      accessToken: result.accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await Authervices.refreshToken(refreshToken);

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Accerss token genereated Successfully",
    data: result,
    // data: {accessToken: result.accessToken, changePassword : result.changePassword}
  });
});

const changePassword = catchAsync(async (req:Request & {user?: any}, res:Response) => {
  const user = req.user;
  const data = req.body

 const result = await Authervices.changePassword(user, data);

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Password Change Succesfully",
    data: result,
    
  });
});

const forgotPassword = catchAsync(async (req:Request & {user?: any}, res:Response) => {
  
 const result = await Authervices.forgotPassword(req.body);

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "check your email",
    data: null,
    
  });
});

const resetPassword = catchAsync(async (req:Request & {user?: any}, res:Response) => {
 const token = req.headers.authorization || " " ;

 await Authervices.resetPassword(token, req.body);

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Password reset Succesfully",
    data: null,
    
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword
};
