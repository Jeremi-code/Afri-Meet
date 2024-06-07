import { Request, Response } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";
import { InsertUserDocument } from "../../gqlGen/types";
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
    const user_id = result.data?.user?.user_id
    const token = genToken(user_id as Number)
    return res.json({user_id,token})
  } catch (error: any) {
    console.log(`Error occured : ${error}`);
  }
};

export default registerUser;
