import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginClient } from "@kubb/plugin-client";

export default defineConfig({
  root: ".",
  input: {
    path: "./api/api.json",
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
      output: {
        path: "./clients/axios",
        barrelType: "named",
        banner: "/* eslint-disable no-alert, no-console */",
        footer: "",
      },
      group: {
        type: "tag",
        name: ({ group }) => `${group}Service`,
      },
      transformers: {
        name: (name, type) => {
          return `${name}Client`;
        },
      },
      operations: true,
      parser: "client",
      exclude: [
        {
          type: "tag",
          pattern: "store",
        },
      ],
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
      mutation: {
        methods: ["post", "put", "delete"],
      },
      infinite: {
        queryParam: "next_page",
        initialPageParam: 0,
        cursorParam: "nextCursor",
      },
      query: {
        methods: ["get"],
        importPath: "@tanstack/react-query",
      },
      suspense: {},
    }),
  ],
});
