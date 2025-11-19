import { config } from "dotenv";
import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginClient } from "@kubb/plugin-client";
import { pluginZod } from "@kubb/plugin-zod";

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
    path: "./src/lib/services/gen",
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
      importPath: "@/lib/services/client",
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
      urlType: "export",
    }),
    pluginReactQuery({
      output: { path: "./hooks", banner: '// @ts-nocheck' },
      client: { dataReturnType: "data" },
      paramsType: "object",
      pathParamsType: "object",
      infinite: {
        cursorParam: 'next_page',
        queryParam: 'page',
        initialPageParam: null
      },
      query: {
        methods: ["get"],
        importPath: "@tanstack/react-query",
      },
      suspense: {},
    }),
    pluginZod({
      output: {
        path: './zod',
      },
      group: { type: 'tag', name: ({ group }) => `${group}Schemas` },
      typed: true,
      dateType: 'date',
      unknownType: 'unknown',
      importPath: 'zod',
    })
  ],
});
