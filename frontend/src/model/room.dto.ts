export type Room = {
  id: string
  name: string
  maximum_users: number
  description: string | null
  password: string | null
  creator_id: string
  topic_id: string[] | null
}