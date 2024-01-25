import {InjectionKey} from "vue"
import {Room} from "@/model/room.dto.ts"

export const roomKey = Symbol() as InjectionKey<Room>