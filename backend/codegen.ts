import { CodegenConfig } from "@graphql-codegen/cli";
import { TypeScriptPluginConfig } from "@graphql-codegen/typescript";
import { getNullableType } from "graphql";
const config: CodegenConfig = {
  overwrite : true,
  schema: "./gqlGen/schema.gql",
  documents: ["graphql/**/*.{graphql,gql}"],
  generates: {
    "./gqlGen/types.ts": {
      plugins: ["typescript", "typescript-operations","typed-document-node"],
      config : {} satisfies TypeScriptPluginConfig  
    },
  },
};
export default config;
