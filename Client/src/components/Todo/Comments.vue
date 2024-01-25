<script setup>
  import { ref } from 'vue'
  import Comment from '../Todo/Comment.vue'

  defineProps(['comments', 'toggle'])



</script>

<template>
  <div>
    <ul v-for="(item, index) in comments" :key="index" class="comments">
      <Comment v-bind="{ comment: item.comment, replies: item.comments }" />
    </ul>
  </div>
</template>

<style scoped>
.comment {
    padding: .25em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-left: 2px solid black;
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
</style>