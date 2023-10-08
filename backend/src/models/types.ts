export interface Room {
  room_id: number | null
  name: string
  maximum_users: number | null
  description: string | null
  password: string | null
  creator_id: number
}

export interface Client {
  user_id: number | null
  username: string
  email: string
  password: string
  biography: string | null
  age: number | null
  member_since: string
  current_room_id: number
}

export interface Message {
  message_id: number | null
  content: string
  timestamp: string
  user_id: number
  room_id: number
}

export interface Topic {
  topic_id: number
  text: string
  color: string
}

export interface LoginClient {
  username: string,
  password: string,
}


