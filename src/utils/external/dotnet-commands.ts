export const dotnetCommands = {
  build: () => `dotnet build`,

  newSln: (name: string, solutionDir: string) =>
    `dotnet new sln --name ${name} --output ${solutionDir}`,

  newWebapi: (name: string, solutionDir: string) =>
    `dotnet new webapi --name ${name} --output ${solutionDir}`,

  newClasslib: (name: string, solutionDir: string) =>
    `dotnet new classlib --name ${name} --output ${solutionDir}`,

  addReference: (solutionDir: string) => `dotnet add reference ${solutionDir}`,

  addPackage: (packageName: string) => `dotnet add package ${packageName}`
}
