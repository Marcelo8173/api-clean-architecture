export default {
  roots:['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnviroment: 'node',
  transform:{
    '.+\\.ts$': 'ts-jest'
  }
};
