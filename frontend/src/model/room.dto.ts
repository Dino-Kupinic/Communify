export type Room = {
  name: string
  maximum_users: number | null
  description: string | null
  password: string | null
  creator_id: string
}