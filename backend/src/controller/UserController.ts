import { Request, Response } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";
import {
  FindUserByEmailDocument,
  InsertUserDocument,
} from "../../gqlGen/types";
import genToken from "../utils/genToken";
import client from "../utils/client";
import { error } from "console";

const userSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const registerUser = async (req: Request, res: Response) => {
  try {
    const validateData = userSchema.safeParse(req.body.input);

    if (!validateData.success) {
      throw fromZodError(validateData.error);
    }
    const { first_name, last_name, email, password } = validateData.data;
    const hashedPassword = bcrypt.hashSync(password, 10);

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
  } catch (error: any) {
    console.log(`Error occured : ${error}`);
  }
};

const authUser = async (req: Request, res: Response) => {
  try {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
    console.log(req.body.input);
    const validateData = loginSchema.safeParse(req.body.input);
    if (!validateData.success) {
      throw fromZodError(validateData.error);
    }
    const { email, password } = validateData.data;
    const result = await client.query({
      query: FindUserByEmailDocument,
      variables: { email },
    });
    const user_id = result.data?.user[0].user_id;
    if (!user_id) {
      throw error("email does not exist");
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const token = genToken(user_id);
    if (hashedPassword !== password) {
      throw new Error("password does not match");
    }
    console.log(result.data?.user[0]?.user_id);
    return res.json({ user_id, token });
  } catch (error) {
    return res.status(401).json({error});
  }
};

export { registerUser, authUser };
