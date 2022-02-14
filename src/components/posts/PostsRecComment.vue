<template>
  <div class="d-flex py-5 comments">
    <div class="flex-shrink-0 pt-4">
      <img
        :src="comment.avatar"
        class="img-fluid rounded-circle"
        alt=""
        height="75"
        width="75"
      />
    </div>
    <div class="flex-grow-1 mt-4 ms-3">
      <div class="d-flex">
        <h5 class="mt-0">{{ comment.author }}</h5>
        <span class="ps-2 date-comment">{{
          new Date(comment.date_create).toDateString()
        }}</span>
      </div>
      <p class="mt-2">{{ comment.content }}</p>
      <a href="#flag" @click="addParent(comment.id)">Ответить</a>
      <rec-comment
        v-for="child in comment.children"
        :comment="child"
        :key="child.id"
        @add-parent="addParent"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "RecComment",
  props: {
    comment: {
      type: Object,
    },
  },
  emits: {
    "add-parent": null,
  },
  methods: {
    addParent(commentId) {
      this.$emit("add-parent", commentId);
    },
  },
};
</script>

<style scoped>
.comments {
  width: 100%;
}
.date-comment {
  opacity: 50%;
}
</style>
