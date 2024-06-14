import { Request, Response } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";
import {
  CheckEmailDocument,
  FindUserByEmailDocument,
  InsertUserDocument,
} from "../../gqlGen/types";
import genToken from "../utils/genToken";
import client from "../utils/client";

const userSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const registerUser = async (req: Request, res: Response) => {
  try {
    const validateData = userSchema.safeParse(req.body.input.arg1);
    if (!validateData.success) {
      throw new Error(fromZodError(validateData.error).message);
    }
    const { first_name, last_name, email, password } = validateData.data;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userFound = await client.query({
      query: CheckEmailDocument,
      variables: { email }
    });
    const userFound_id = userFound.data?.user[0]?.user_id;
    if (userFound_id) {
      throw new Error('User already exists with this email');
    }

    const result = await client.mutate({
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
    const user_id = result.data?.user?.user_id;
    const token = genToken(user_id as Number);
    return res.json({ user_id, token });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
};

const authUser = async (req: Request, res: Response) => {
  try {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
    const validateData = loginSchema.safeParse(req.body.input.arg1);
    if (!validateData.success) {
      throw new Error(fromZodError(validateData.error).message);
    }

    const { email, password } = validateData.data;
    const result = await client.query({
      query: FindUserByEmailDocument,
      variables: { email },
    });

    if (!result.data?.user[0]) {
      throw new Error("Email does not exist");
    }

    const user = result.data?.user[0];
    const passwordCheck = bcrypt.compareSync(password, user.password);
    if (!passwordCheck) {
      throw new Error("Password does not match");
    }
    
    const token = genToken(user.user_id);
    return res.json({ user_id: user.user_id, token });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
};

export { registerUser, authUser };