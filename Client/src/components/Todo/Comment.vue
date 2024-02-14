<script>
  export default {
    name: "recursive-comment",
  };
</script>
<script setup>
  import { useUserStore } from '../../stores/user.store'
  import { useTodoStore } from '../../stores/todo.store'
  import { ref } from 'vue'

  const todoStore = useTodoStore()

  defineProps(['comment', 'depth', 'todoId', 'parentId'])

  const newComment = ref({
    body: ''
  })

  const addAComment = (commentId, todoId) => {
    console.log(`Adding a comment: id:${commentId}, todoId:${todoId}`)
    const data = {
      body: newComment.value.body,
      author: useUserStore().user,
      // comments: comment.comments,
    }
    todoStore.addCommentToComment(commentId, data, todoId)
  }

  const deleteAComment = (commentId, depth, parentId, todoId) => {
    console.log(`[Comment.vue] - deleteAComment: commentId: ${commentId} , todoId: ${todoId}`)
    todoStore.deleteComment(commentId, depth, parentId, todoId)
  }

</script>
<template>
  <div class="comment-container">

    <div class="comment" v-if="comment && comment.author">
      <div class="author">
        <label>{{ comment.author.username }}</label>
        <img :src="comment.author.img" alt="" class="author-img">
        <span>{{ comment.createdAt.slice(-4) }}</span>
        <span>ID: {{ comment._id.slice(-5) }} </span>
      </div>

      <div class="comment-body" style="background-color: rgba(255, 255, 255, 0.25)">
        <span>{{ comment.body }}</span>
        <span>
          Depth:{{ depth }}, Author:{{ comment.author.username }}, TodoId: {{ todoId.slice(-5) }}, ParentTodoId:
          {{ parentId ? "Parent Comment ID: " + parentId.slice(-5) : "Parent Todo ID: " + todoId.slice(-5) }}
        </span>
      </div>

      <div class="comment-actions">
        <button>Edit</button>
        <button @click="deleteAComment(comment._id, depth, parentId, todoId)">Delete</button>
      </div>
    </div>

    <div class="add-comment" v-if="depth < 4">
      <textarea cols="30" rows="10" placeholder="Add a comment" v-model="newComment.body"></textarea>
      <button @click="addAComment(comment._id, todoId)">Add</button>
    </div>

    <ul v-for="(comment, index) in comment.comments" :key="index">
      <recursive-comment v-bind="{ comment, todoId }" :depth="depth + 1" :parentId="this.comment._id" />
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
  display: flex;
  flex-direction: column;
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