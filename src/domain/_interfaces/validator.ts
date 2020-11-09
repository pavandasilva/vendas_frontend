export interface Validator {
  validate: (obj: any) => Promise<void>
}
