export interface Room {
  room_id: number | null
  name: string
  maximum_users: number | null
  description: string | null
  password: string | null
  creator_id: number
}