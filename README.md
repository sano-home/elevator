# Elevator

Interactive elevator buttons for my 2-year-old son who loves elevators.

https://sano-home.github.io/elevator/

https://github.com/sano-home/elevator/assets/1838232/eeef1550-9d7a-4304-870d-823a52322cff

# Development

This project uses [Vite](https://vite.dev/). Node.js version is specified in `.node-version`.

```sh
npm install
npm start          # start the dev server
npm test           # run tests (Vitest)
npm run typecheck  # type-check with tsc
npm run eslint     # lint
npm run format     # format with Prettier
npm run build      # type-check and build into ./build
npm run preview    # preview the production build locally
npm run deploy     # build and publish ./build to the `deploy` branch (GitHub Pages)
```

CI (GitHub Actions) runs type-check, lint, format check, tests and build on every pull request.
Pushes to `main` are deployed automatically once these checks pass: the build is published to the
`deploy` branch, which GitHub Pages serves. `npm run deploy` publishes to the same branch from your machine.
