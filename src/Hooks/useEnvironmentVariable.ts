export const useEnvironmentVariable = (variableName: string) => {
  return import.meta.env[variableName]
}