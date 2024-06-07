import { Request, Response } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { InsertUserDocument } from "../../gqlGen/types";
import client from "../utils/client";

const userSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const SECRET_KEY = z.string()

const registerUser = async (req: Request, res: Response) => {
  try {
    const validateData = userSchema.safeParse(req.body.input);
    const valSecretKey = SECRET_KEY.parse(process.env.JWT_SECRET)
    if (!validateData.success) {
      throw fromZodError(validateData.error);
    }
    const { first_name, last_name, email, password } = validateData.data;
    const hashedPassword = bcrypt.hashSync(password, 10);
    jwt.sign({ email },valSecretKey, { expiresIn: "1h" });

    await client.mutate({
      mutation: InsertUserDocument,
      variables: {
        obj: {
          first_name,
          last_name,
          email,
          password: hashedPassword,
        },
      },
    });
  } catch (error: any) {
    console.log(`Error occured : ${error}`);
  }
};

export default registerUser;
