type Error = {
  $uid: string
  $message: string
}

type Field = {
  $invalid: boolean
  $errors: Error[]
}

export interface V$ {
  [key: string]: Field
}