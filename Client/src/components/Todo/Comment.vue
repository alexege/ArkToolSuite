<script>
  export default {
    name: "recursive-comment",
  };
</script>
<script setup>
  defineProps(['comment', 'depth'])

</script>
<template>
  <div>

    <div class="author">
      <img :src="comment.author.img" alt="" class="author-img">
    </div>

      {{ depth }} {{ comment.author.username }} - {{ comment.body }}
      
      <!-- <div>
        <input type="text">
        <label for="">Add Reply</label>
        <button>Reply</button>
      </div> -->

      <ul v-for="(comment, index) in comment.comments" :key="index">
        <recursive-comment v-bind="{ comment }" 
          :depth="depth + 1"
        />
      </ul>

  </div>
</template>
<style scoped>
.author {

}

.author img {
  width: 50px;
  height: 50px;
}
</style>