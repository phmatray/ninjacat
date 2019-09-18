export const dotnetCommands = {
  versionCmd: () => `dotnet --version`,

  buildCmd: () => `dotnet build`,

  newSlnCmd: (name: string, solutionDir: string) =>
    `dotnet new sln --name ${name} --output ${solutionDir}`,

  newWebapiCmd: (name: string, solutionDir: string) =>
    `dotnet new webapi --name ${name} --output ${solutionDir}`,

  newClasslibCmd: (name: string, solutionDir: string) =>
    `dotnet new classlib --name ${name} --output ${solutionDir}`,

  addReferenceCmd: (solutionDir: string) => `dotnet add reference ${solutionDir}`,

  addPackageCmd: (packageName: string) => `dotnet add package ${packageName}`
}
