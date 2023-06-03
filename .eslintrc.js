module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "react-app",
    "prettier",
  ],
  overrides: [
    {
      parserOptions: {
        project: "./tsconfig.json",
      },
      files: ["**/*.ts", "**/*.tsx"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "react-app",
        "prettier",
      ],
      rules: {
        "@typescript-eslint/no-empty-function": [
          "error",
          { allow: ["arrowFunctions", "private-constructors"] },
        ],
        "no-unused-expressions": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unnecessary-type-constraint": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "sort-imports": "off",
        "spaced-comment": [
          "error",
          "always",
          {
            markers: ["/"],
          },
        ],
        "import/no-unresolved": "off",
        "import/named": "off",
        "import/order": [
          "error",
          {
            alphabetize: { order: "asc" },
            "newlines-between": "always",
            groups: [
              "builtin",
              "external",
              "internal",
              "index",
              "object",
              "parent",
              "sibling",
            ],

          },
        ],
      },
    },
  ],
};
