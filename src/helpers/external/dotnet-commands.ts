export const dotnetCommands = {
  versionCmd: (): string => `dotnet --version`,

  buildCmd: (): string => `dotnet build`,

  newSlnCmd: (name: string, solutionDir: string): string => `dotnet new sln --name ${name} --output ${solutionDir}`,

  newWebapiCmd: (name: string, solutionDir: string): string =>
    `dotnet new webapi --name ${name} --output ${solutionDir}`,

  newClasslibCmd: (name: string, solutionDir: string): string =>
    `dotnet new classlib --name ${name} --output ${solutionDir}`,

  addReferenceCmd: (solutionDir: string): string => `dotnet add reference ${solutionDir}`,

  addPackageCmd: (packageName: string): string => `dotnet add package ${packageName}`,
}
