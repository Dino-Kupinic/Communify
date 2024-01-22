import {computed} from "vue"

export function useFormatTitle(text: string, max_size: number = 15) {
  const MAX_DISPLAY_ROOM_NAME: number = max_size

  return computed(() => {
    if (text.length > MAX_DISPLAY_ROOM_NAME) {
      return `${text.slice(0, MAX_DISPLAY_ROOM_NAME)}...`
    }
    return text
  })
}
