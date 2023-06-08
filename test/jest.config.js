const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('../../tsconfig.json')
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: pathsToModuleNameMapper({
        "@external/*": ["src/external/*"]
    }),
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
    ],
    rootDir: ".",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    collectCoverageFrom: [
        "**/*.(t|j)s"
    ],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    modulePaths: [
        '<rootDir>'
    ],
}