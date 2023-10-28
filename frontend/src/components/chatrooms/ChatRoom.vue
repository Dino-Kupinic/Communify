<script setup lang="ts">
import ChatRoomHeaderBar from "@/components/chatrooms/ChatRoomHeaderBar.vue"
import UserInput from "@/components/user/UserInput.vue"
import Message from "@/components/messages/Message.vue"
import type {Room} from "@/model/types"

const props = defineProps<{
  room: Room
}>()
</script>

<template>
  <div id="chatroom-div-container">
    <header>
      <ChatRoomHeaderBar></ChatRoomHeaderBar>
    </header>


    <div id="content-container">
      <Message messageType="from-me">I recently adopted a cute puppy.</Message>
      <Message messageType="from-them">That's wonderful! What's your puppy's name?</Message>
      <Message messageType="from-me">I named him Max, and he's a playful Labrador.</Message>
      <Message messageType="from-them">Labradors are known for their friendly nature. How's Max settling in?</Message>
      <Message messageType="from-them">Do you have any other pets as well?</Message>
      <Message messageType="from-them">I have a cat named Whiskers, and they're getting along surprisingly well.</Message>
      <Message messageType="from-me">I'm considering adopting a puppy too. Any advice on introducing a new puppy to a dog?</Message>
      <Message messageType="from-me">I've heard it can be a bit tricky.</Message>
      <Message messageType="from-them">Introducing a cat to a dog can take time and patience. Make sure to supervise their initial interactions and create a safe space for the cat. Gradual introductions are key.</Message>
      <Message messageType="from-me">By the way, do you have any funny pet stories to share?</Message>
      <Message messageType="from-them">Oh, I have a hilarious one. Once, my dog stole a slice of pizza right off the table and ran around the house with it. It was chaos, but we all had a good laugh.</Message>
      <Message messageType="from-me">That sounds like a memorable moment. Pets sure know how to keep us entertained.</Message>
      <Message messageType="from-them">Absolutely, they bring so much joy to our lives.</Message>
      <Message messageType="from-them">I hope Max and Whiskers continue to bring you happiness.</Message>
      <Message messageType="from-me">Thank you, I feel incredibly lucky to have them.</Message>
      <Message messageType="from-me">If you have any more pet stories or tips, feel free to share them anytime.</Message>
      <Message messageType="from-them">I'll do that. Have a great day with your furry friends!</Message>
      <Message messageType="from-me">You too, enjoy your time with your pets!</Message>
      <Message messageType="from-them">Goodbye!</Message>
      <Message messageType="from-me">Goodbye!</Message>
    </div>
    <div id="Input-Container">
      <UserInput></UserInput>
    </div>
  </div>
</template>

<style scoped>
#chatroom-div-container {
  width: 75%;
  float: right;
}

#content-container {
  height: 86vh;
  background-color: var(--color-background-soft);
  overflow-y: scroll;
  border-bottom: 1px solid var(--color-border-soft);
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1.1rem;
}

header {
  height: 8vh;
  width: 100%;
  border-bottom: 1px solid var(--color-border-soft);
  padding: 0;
}

#Input-Container {
  padding: 1rem;
  height: 6vh;
  position: sticky;
}
</style>