import { config } from "dotenv";
import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginClient } from "@kubb/plugin-client";

let schema  ="https://";

if ((process.env.NODE_ENV || "development") === "development") {
  schema = "http://";
  config({ path: ".env.local" });
}

console.log("base url: ", process.env.VERCEL_URL);
export default defineConfig({
  root: ".",
  input: {
    path: "./api/swagger.json",
  },
  output: {
    path: "./app/lib/services/gen",
    clean: true,
  },
  hooks: {
    // done: ['npm run typecheck', 'biome format --write ./', 'biome lint --apply-unsafe ./src'],
  },
  plugins: [
    pluginOas({ validate: false }),
    pluginTs({
      output: {
        path: "models",
      },
      group: {
        type: "tag",
        name: ({ group }) => `${group}Controller`,
      },
      enumType: "asConst",
      enumSuffix: "Enum",
      dateType: "date",
      unknownType: "unknown",
      optionalType: "questionTokenAndUndefined",
      oasType: false,
    }),
    pluginClient({
      baseURL: `${schema}${process.env.VERCEL_URL}`,
      output: {
        path: "./client",
        barrelType: "named",
        banner: "/* eslint-disable no-alert, no-console */",
        footer: "",
      },
      group: {
        type: "tag",
        name: ({ group }) => `${group}Service`,
      },
      operations: false,
      parser: "client",
      paramsType: "object",
      pathParamsType: "object",
      dataReturnType: "full",
      client: "axios",
    }),
    pluginReactQuery({
      output: {
        path: "./hooks",
      },
      group: {
        type: "tag",
        name: ({ group }) => `${group}Hooks`,
      },
      client: {
        dataReturnType: "full",
      },
      paramsType: "object",
      pathParamsType: "object",
      mutation: {
        methods: ["post", "put", "delete"],
      },
      query: {
        methods: ["get"],
        importPath: "@tanstack/react-query",
      },
      suspense: {},
    }),
  ],
});
