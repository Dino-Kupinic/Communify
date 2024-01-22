import {defineStore, storeToRefs} from "pinia"
import {pb} from "@/db/pocketbase.ts"
import {ref} from "vue"
import {useErrorStore} from "@/stores/errorStore.ts"
import {Topic} from "@/model/topic.dto.ts"

export const useTopicStore = defineStore("topic", () => {
  const topics = ref<Topic[]>([])

  async function fetchTopics(): Promise<void> {
    try {
      topics.value = await pb.collection("topics").getFullList()
      await pb
        .collection("topics")
        .subscribe("*", async ({action, record}) => {
          switch (action) {
            case "create":
              const newTopic = await pb.collection("topic").getOne(record.id)
              record.expand = {newTopic}
              const topic: Topic = {
                id: record.id,
                text: record.text,
                color: record.color
              }
              topics.value.push(topic)
              break
            case "update":
              // TODO
              break
            case "delete":
              // TODO
              break
          }
        })
    } catch (err) {
      handleError(err)
    }
  }

  async function addTopic(topic: Topic): Promise<void> {
    try {
      const response = await pb.collection("topics").create(topic)
      if (response.ok)
        await fetchTopics()
    } catch (err) {
      handleError(err)
    }
  }

  async function deleteTopic(topic_id: string): Promise<void> {
    try {
      await pb.collection("topic").delete(topic_id)
    } catch (err) {
      handleError(err)
    }
  }

  function handleError(err: any) {
    console.error(err)
    const {errorMessage} = storeToRefs(useErrorStore())
    errorMessage.value = `${err}`
  }

  return {topics, fetchTopics, addTopic, deleteTopic}
})