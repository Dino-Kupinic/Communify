<script setup lang="ts">
import ChatRoomHeaderBar from "@/components/chatrooms/ChatRoomHeaderBar.vue"
import UserInput from "@/components/user/UserInput.vue"
import Message from "@/components/messages/Message.vue"

const props = defineProps<{
  roomID?: String
}>()
</script>

<template>
  <div id="chatroom-div-container">
    <header>
      <ChatRoomHeaderBar></ChatRoomHeaderBar>
    </header>


    <div id="content-container">
      <div id="placeholder">
      </div>
        <Message messageType="sent" messageText="Awdwdawd aqdwad aq2 dqddwdawd aqdwad aq2 dqddwdawd aqdwad aq2 dqddwdawd aqdwad aq2 dqddwdawd aqdwad aq2 dqddwdawd aqdwad aq2 dqddwdawd aqdwad aq2 dqddwdawd aqdwad aq2 dqddwdawd aqdwad aq2 dqddwdawd aqdwad aq2 dqddwdawd aqdwad aq2 dqddwdawd aqdwad aq2 dqd "></Message>
        <Message messageType="received" messageText="awdwdawd aqdwad aq2 dqd qawd"></Message>
        <Message messageType="sent" messageText="awdwdawd aqdwad aq2 dqd qawd"></Message>
        <Message messageType="received" messageText="awdwdawd aqdwad aq2 dqd qawd"></Message>
        <Message messageType="received" messageText="awdwdawd aqdwad aq2 dqd qawd"></Message>
        <Message messageType="received" messageText="awdwdawd aqdwad aq2 dqd qawd"></Message>
        <Message messageType="received" messageText="awdwdawd aqdwad aq2 dqd qawd"></Message>
        <Message messageType="sent" messageText="awdwdawd aqdwad aq2 dqd qawd"></Message>
        <Message messageType="sent" messageText="awdwdawd aqdwad aq2 dqd qawd"></Message>
        <Message messageType="sent" messageText="awdwdawd aqdwad aq2 dqd qawd"></Message>
        <Message messageType="received" messageText="awdwdawd aqdwad aq2 dqd qawd"></Message>
        <Message messageType="sent" messageText="awdwdawd aqdwad aq2 dqd qawd"></Message>
        <Message messageType="received" messageText="awdwdawd aqdwad aq2 dqd qawd"></Message>
        <Message messageType="received" messageText="awdwdawd aqdwad aq2 dqd qawd"></Message>
        <Message messageType="received" messageText="awdwdawd aqdwad aq2 dqd qawd"></Message>
        <Message messageType="sent" messageText="awdwdawd aqdwad aq2 dqd qawd"></Message>
        <Message messageType="sent" messageText="awdwdawd aqdwad aq2 dqd qawd"></Message>
      <div id="Input-Container">
        <UserInput></UserInput>
      </div>
    </div>
  </div>
</template>

<style scoped>
#chatroom-div-container {
  width: 75%;
  float: right;

}

#content-container {
  height: 89.2vh;
  background-color: var(--color-background-soft);
  overflow-y: scroll;
}

header {
  width: 100%;
  border-bottom: 1px solid var(--color-border-soft);
  padding: 0;
}

#Input-Container {
  position: sticky;
  bottom: 2%;
}

#placeholder {
  height: 1%;
  width: 100%;
}
</style>