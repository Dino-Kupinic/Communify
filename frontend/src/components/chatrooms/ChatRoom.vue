<script setup lang="ts">

import Icon from "@/components/util/Icon.vue"
import ChatRoomHeaderBar from "@/components/chatrooms/ChatRoomHeaderBar.vue"
import UserInput from "@/components/user/UserInput.vue"
</script>

<template>
<div id="chatroom-div-container">
  <header>
  <ChatRoomHeaderBar></ChatRoomHeaderBar>
  </header>

  <div id="content-container">
    <div id="message-container">

    </div>
    <Message></Message>

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
  height: 89.4vh;
  background-color: var(--color-background-soft);
}

header {
  width: 100%;
  border-bottom: 1px solid var(--color-border-soft);
  padding: 0  ;
}

#Input-Container {
  position: sticky;
  top: 90%;
}
</style>