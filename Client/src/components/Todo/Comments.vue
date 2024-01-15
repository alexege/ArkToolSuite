<script setup>
  import { ref } from 'vue'
  import Comment from '../Todo/Comment.vue'
  const showSection = ref(false)

  defineProps(['comments', 'toggle'])
  const toggleComment = () => {
    console.log("Toggling Comment")
    showSection.value = !showSection.value
  }

  const addComment = ref(false)
</script>

<template>
  <div>
    <span class="toggleIcon" @click="toggleComment"><span v-if="comments">({{ comments.length }})</span> {{ showSection ? '&#9650;' : '&#9660;' }}</span>
    <div v-if="showSection">
      
        <Comment v-for="comment in comments" 
            :key="comment._id" 
            :comment="comment" 
            :toggle="showSection"
            :depth="0">
        </Comment>        

        <!-- Add Comment -->
        <div class="add-comment" v-if="addComment">
            <span @click="addComment = false">Cancel</span>
            <textarea v-model="newComment" placeholder="Add a comment"></textarea>
            <button>Post</button>
        </div>
        <div v-else>
            <a href="" @click.prevent="addComment = true">Add Comment</a>
        </div>

    </div>
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