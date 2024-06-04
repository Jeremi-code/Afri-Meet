import { CodegenConfig } from "@graphql-codegen/cli";
import { TypeScriptPluginConfig } from "@graphql-codegen/typescript";
const config: CodegenConfig = {
  overwrite : true,
  schema: "./gql/schema.gql",
  documents: ["graphql/**/*.graphql"],
  generates: {
    ".gql/types.ts": {
      plugins: ["typescript", "typescript-operations", "type-document-node"],
      config : {} as TypeScriptPluginConfig  
    },
  },
};
export default config;
