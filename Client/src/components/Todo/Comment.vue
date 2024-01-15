<script>
  export default {
    name: 'recursive-comment'
  }
</script>
<script setup>
  import { ref, computed } from 'vue'
  const showSection = ref(true)
  const newReply = ref()

  defineProps(['comment', 'toggle', 'isReply', 'depth'])

  const toggleComment = () => {
    showSection.value = !showSection.value
  }

  const showReplies = ref(false)
  const toggleReplies = () => {
    showReplies.value = !showReplies.value
  }

  const viewAddReply = ref(false)

  const addReply = () => {
    //Post new Reply to Database
    viewAddReply.value = false
  }

  const showThisSelection = computed(() => {
    
  })
</script>

<template>
  <div :style="{'marginLeft' : `${depth * 20}px`}">
    <div class="container">
      <!-- <span class="collapse" @click="toggleComment"></span> -->
    <div class="comment-container" v-if="showSection">

<div class="comment-body">

    <div :class="isReply ? 'reply':'comment'" > 
      <!-- :style="indent" -->
      <span class="collapse" @click="toggleComment"></span>
      <div class="comment-author">
          <p>{{ comment.author.name }}</p>
          <img :src="comment.author.img" alt="">
          <span>{{ comment.createdAt }}</span>
      </div>
      <div class="comment-body">
          <span>{{ comment.title }}</span>
          <span>{{ comment.body }}</span>
      </div>
    </div>
    <span class="toggleIcon" @click="toggleReplies" v-if="comment.replies && comment.replies.length > 0"><span v-if="comment.replies">({{ comment.replies.length }})</span> {{ showReplies ? '&#9650;' : '&#9660;' }}</span>

</div>

    <div class="replies">
      
      <div class="add-reply" v-if="viewAddReply">
        <span @click="viewAddReply = false">Cancel</span>
        <textarea v-model="newReply" placeholder="Add a reply"></textarea>
        <button @click="addReply">Post</button>
      </div>
      <div v-else>
        <a @click="viewAddReply = true">reply</a>
      </div>

      <div v-if="showReplies">
      <recursive-comment v-for="comment in comment.replies"
          :key="comment._id"
          :comment="comment"
          :toggle="showSection"
          :isReply="true"
          :depth="depth + 1"
          />
      </div>

    </div>
    </div>
  </div>
  </div>
</template>

<style scoped>

.comment-body {
  display: flex;
}
.container {
  display: flex;
  flex-direction: row;
}
.collapse {
  align-self: stretch;
  min-height: 1em;
  width: 2px;
  border-left: 2px solid black;
  cursor: pointer;
  margin: .5em;
}
.comment-container {
  /* border-left: 2px solid black; */
  padding: 5px;
  margin-bottom: 10px;
}
.comment {
    padding: .25em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* border-left: 2px solid black; */
}

.comment-author {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.comment-author span {
    font-size: 0.5em;
    width: 50%;
    text-align:center;
}

.comment-body {
    padding: 0.5em;
    flex: 1;
}

.comment img {
    width: 40px;
    height: 40px;
}

.reply {
  padding: .25em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* border-left: 2px solid black; */
}

.toggleIcon {
  cursor: pointer;
}

.add-comment {
    display: flex;
    padding: .25em 1em;
}

.add-comment textarea {
    flex: 1;
}

.add-reply {
  display: flex;
  padding: .25em 1em;
}

.add-reply textarea {
  flex: 1;
  height: 2em;
}

/* Transitions */

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>