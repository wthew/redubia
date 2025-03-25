import { config } from "dotenv";
import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginClient } from "@kubb/plugin-client";

console.log("env: ", process.env.NODE_ENV);

if ((process.env.NODE_ENV || "development") === "development")
  config({ path: ".env.local" });

console.log("base url: ", process.env.API_URL);
export default defineConfig({
  root: ".",
  input: {
    path: "swagger.json",
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
      output: { path: "models" },
      enumType: "asConst",
      enumSuffix: "Enum",
      dateType: "date",
      unknownType: "unknown",
      optionalType: "questionTokenAndUndefined",
      oasType: false,
    }),
    pluginClient({
      baseURL: process.env.API_URL,
      output: {
        path: "./client",
        barrelType: "named",
        banner: "/* eslint-disable no-alert, no-console */",
        footer: "",
      },
      group: { type: "tag", name: ({ group }) => `${group}Service` },
      operations: false,
      parser: "client",
      paramsType: "object",
      pathParamsType: "object",
      dataReturnType: "data",
    }),
    pluginReactQuery({
      output: { path: "./hooks", banner: '// @ts-nocheck' },
      client: { dataReturnType: "data" },
      paramsType: "object",
      pathParamsType: "object",
      infinite: {
        cursorParam: 'next_cursor',
        queryParam: 'cursor',
        initialPageParam: null
      },
      query: {
        methods: ["get"],
        importPath: "@tanstack/react-query",
      },
      suspense: {},
    }),
  ],
});
