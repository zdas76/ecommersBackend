import dotenv from "dotenv";
import path = require("path");

dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    expires: process.env.EXPIRES_IN,
    refresh_token: process.env.REFERESH_TOKEN_SECRET,
    refresh_expires: process.env.REFERESH_TOKEN_EXPIRES_IN,
    reset_password_secret: process.env.RESET_PASSWORD_TOKEN,
    reset_password_expires_in: process.env.RESET_TOKEN_EXPIRES_IN,
  },
  reset_pass_link: process.env.RESET_PASSWORD_LINK,
  emailSender: {
    email: process.env.EMAIL,
    app_pass: process.env.APP_PASS,
  },
};
