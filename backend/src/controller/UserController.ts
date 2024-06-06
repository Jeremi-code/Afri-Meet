import { Request, Response } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { InsertUserDocument } from "../../gqlGen/types";

const userSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const registerUser = async (req: Request, res: Response) => {
  try {
    console.log('zarema na negem na ')
      const validateData = userSchema.safeParse(req.body);
      if (!validateData.success) {
          throw fromZodError(validateData.error);
      }
      const { first_name, last_name, email, password } = validateData.data;
      const hashedPassword = bcrypt.hashSync(password, 10);
      jwt.sign({ email }, 'secret key', { expiresIn   : '1h' });

      const client = new ApolloClient({
          uri: 'https://hasura.io/learn/graphql',
          cache: new InMemoryCache()
      });

      client.mutate({
          mutation:InsertUserDocument,
          variables : { obj : {
              first_name ,
              last_name,
              email,
              password:hashedPassword

          }

          }
      })

  } catch (error : any)
   {
      console.log(`Error occured : ${error}`);
  }
//   res.send("Ermias sintayehu");
};

export default registerUser;
