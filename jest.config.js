module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  transformIgnorePatterns: ["/node_modules/(?!axios).+\\.js"],
};
