"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authervices = void 0;
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt = __importStar(require("bcrypt"));
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../config"));
const ApiErrors_1 = __importDefault(require("../../errors/ApiErrors"));
const http_status_codes_1 = require("http-status-codes");
const emailSender_1 = __importDefault(require("./emailSender"));
const loginUser = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payLoad.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    if (!userData) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Your are not Authorized");
    }
    const isCorrectPassword = yield bcrypt.compare(payLoad.passWord, userData.passWord);
    if (!isCorrectPassword) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Your are not Authorized");
    }
    const accessToken = jwtHelpers_1.JwtHelpers.generateToken({ email: userData.email, role: userData.role }, config_1.default.jwt.secret, config_1.default.jwt.expires);
    const refreshToken = jwtHelpers_1.JwtHelpers.generateToken({ email: userData.email, role: userData.role }, config_1.default.jwt.refresh_token, config_1.default.jwt.refresh_expires);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelpers_1.JwtHelpers.verifyToken(token, config_1.default.jwt.refresh_token);
    }
    catch (error) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Your are not Authorized");
    }
    const checkUser = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const accessToken = jwtHelpers_1.JwtHelpers.generateToken({ email: checkUser.email, role: checkUser.role }, config_1.default.jwt.secret, config_1.default.jwt.expires);
    return {
        accessToken
    };
});
const changePassword = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user, data);
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    const isCorrectPassword = yield bcrypt.compare(data.olePassword, userData.passWord);
    if (!isCorrectPassword) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Your are not Authorized");
    }
    const hassPassWord = yield bcrypt.hash(data.newPassword, 12);
    yield prisma_1.default.user.update({
        where: {
            email: userData.email,
            status: client_1.UserStatus.ACTIVE,
        },
        data: {
            passWord: hassPassWord,
        },
    });
    return {
        message: "Password Change Succesfully",
    };
});
const forgotPassword = (playLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: playLoad.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const resetPasswordToken = jwtHelpers_1.JwtHelpers.generateToken({ email: userData.email, role: userData.role }, config_1.default.jwt.reset_password_secret, config_1.default.jwt.reset_password_expires_in);
    const resetPassLink = config_1.default.reset_pass_link +
        `?email=${userData.email}&token=${resetPasswordToken}`;
    yield (0, emailSender_1.default)(userData.email, `
    <p> Your password reset link 
    <a href=${resetPassLink}>
      Reset Password
    </a>
    </p>
    `);
});
const resetPassword = (token, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payLoad.email,
            status: client_1.UserStatus.ACTIVE
        }
    });
    const isValidToken = jwtHelpers_1.JwtHelpers.verifyToken(token, config_1.default.jwt.reset_password_secret);
    if (!isValidToken) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Your are not Authorized");
    }
    const hassPassWord = yield bcrypt.hash(payLoad.passWord, 12);
    yield prisma_1.default.user.update({
        where: {
            email: userData.email,
            status: client_1.UserStatus.ACTIVE,
        },
        data: {
            passWord: hassPassWord,
        },
    });
});
exports.Authervices = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword
};
