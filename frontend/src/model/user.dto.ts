export type User = {
  username: string
  email: string
  emailVisibility: boolean,
  password: string
  passwordConfirm: string
  age: number
  biography: string | null
}