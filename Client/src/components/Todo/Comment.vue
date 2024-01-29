<script>
  export default {
    name: "recursive-comment",
  };
</script>
<script setup>
  import { useUserStore } from '../../stores/user.store'
  import { useTodoStore } from '../../stores/todo.store'
  import { useCommentStore } from '../../stores/comment.store'
  import { ref } from 'vue'

  defineProps(['comment', 'depth', 'todoId'])

  const newComment = ref({
    body: ''
  })

  const addAComment = (id, todoId) => {
    console.log(`Adding a comment: id:${id}, todoId:${todoId}`)
    const data = {
      body: newComment.value.body,
      author: useUserStore().user,
      // comments: comment.comments,
    }
    todoId = null
    useCommentStore().addComment(id, data, todoId)
  }

  const deleteAComment = (commentId, todoId) => {
    console.log(";;;;;;deleteAcomment: ", todoId)
    useCommentStore().deleteComment(commentId, todoId)
  }

</script>
<template>
  <div class="comment-container">

    <div class="comment" v-if="comment && comment.author">
      <div class="author">
        <label>{{ comment.author.username }}</label>
        <img :src="comment.author.img" alt="" class="author-img">
        <span>{{ comment.createdAt.slice(-4) }}</span>
      </div>

      <div class="comment-body">
        {{ depth }} {{ comment.author.username }} - {{ comment.body }} - todoId: {{ todoId }}
      </div>

      <div class="comment-actions">
        <button>Edit</button>
        <button @click="deleteAComment(comment._id, todoId)">Delete</button>
      </div>
    </div>
        
        <div class="add-comment">
          <textarea cols="30" rows="10" placeholder="Add a comment" v-model="newComment.body"></textarea>
          <button @click="addAComment(comment._id, todoId)">Add</button>
        </div>

        <ul v-for="(comment, index) in comment.comments" :key="index">
          <recursive-comment v-bind="{ comment, todoId}" 
            :depth="depth + 1"
          />
        </ul>

  </div>
</template>
<style scoped>
.comment-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.comment {
  display: flex;
  flex-direction: row;
  align-items: center;
  outline: 1px solid white;
}
.comment-body {
  flex: 4;
}
.comment-actions {
  display: flex;
  justify-content: space-around;
  flex: 1;
}
.author {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.author img {
  width: 50px;
  height: 50px;
}
.add-comment {
  display: flex;
}
.add-comment textarea {
  flex: 3;
  height: 2em;
}
</style>