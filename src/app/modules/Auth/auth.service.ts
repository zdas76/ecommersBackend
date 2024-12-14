import { JwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import { UserStatus } from "@prisma/client";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import ApiErrors from "../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import emailSender from "./emailSender";

const loginUser = async (payLoad: { email: string; passWord: string }) => {

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payLoad.email,
      status: UserStatus.ACTIVE,
    },
  });

  if (!userData) {
    throw new ApiErrors(StatusCodes.UNAUTHORIZED, "Your are not Authorized");
  }

  const isCorrectPassword: boolean = await bcrypt.compare(
    payLoad.passWord,
    userData.passWord
  );
console.log(isCorrectPassword)

  if (!isCorrectPassword) {
    throw new ApiErrors(StatusCodes.UNAUTHORIZED, "Worng password");
  }

  const accessToken = JwtHelpers.generateToken(
    {id:userData.id, email: userData.email, role: userData.role },
    config.jwt.secret as Secret,
    config.jwt.expires as string
  );

  const refreshToken = JwtHelpers.generateToken(
    {  email: userData.email, role: userData.role },
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_expires as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = JwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token as Secret
    );
  } catch (error) {
    throw new ApiErrors(StatusCodes.UNAUTHORIZED, "Your are not Authorized");
  }

  const checkUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = JwtHelpers.generateToken(
    {id:checkUser.id, email: checkUser.email, role: checkUser.role },
    config.jwt.secret as Secret,
    config.jwt.expires as string
  );

  return {
    accessToken
  };
};

const changePassword = async (
  user: { email: string; role: string; iat: number; exp: number },
  data: { olePassword: string; newPassword: string }
) => {
  console.log(user, data);
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  const isCorrectPassword: boolean = await bcrypt.compare(
    data.olePassword,
    userData.passWord
  );

  if (!isCorrectPassword) {
    throw new ApiErrors(StatusCodes.UNAUTHORIZED, "Your are not Authorized");
  }
  const hassPassWord: string = await bcrypt.hash(data.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
      status: UserStatus.ACTIVE,
    },
    data: {
      passWord: hassPassWord,
    },
  });

  return {
    message: "Password Change Succesfully",
  };
};

const forgotPassword = async (playLoad: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: playLoad.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPasswordToken = JwtHelpers.generateToken(
    {id:userData.id, email: userData.email, role: userData.role },
    config.jwt.reset_password_secret as Secret,
    config.jwt.reset_password_expires_in as string
  );
  const resetPassLink =
    config.reset_pass_link +
    `?email=${userData.email}&token=${resetPasswordToken}`;
  await emailSender(
    userData.email,
    `
    <p> Your password reset link 
    <a href=${resetPassLink}>
      Reset Password
    </a>
    </p>
    `
  );
  
};


const resetPassword = async(token: string, payLoad: {email: string, passWord: string})=> {
const userData = await prisma.user.findUniqueOrThrow({
  where: {
    email:payLoad.email,
    status: UserStatus.ACTIVE
  }
})

const isValidToken = JwtHelpers.verifyToken(token, config.jwt.reset_password_secret as Secret)

if (!isValidToken) {
  throw new ApiErrors(StatusCodes.UNAUTHORIZED, "Your are not Authorized");
}
const hassPassWord: string = await bcrypt.hash(payLoad.passWord, 12);

await prisma.user.update({
  where: {
    email: userData.email,
    status: UserStatus.ACTIVE,
  },
  data: {
    passWord: hassPassWord,
  },
})
}

export const Authervices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword
};
