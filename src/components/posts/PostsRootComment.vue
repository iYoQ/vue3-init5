<template>
  <div class="cols" id="flag">
    <h3 class="">Оставить комментарий</h3>
    <form action="#" method="get" class="mt-4" id="formComment">
      <div class="form-group">
        <label for="contactcomment" class="">Ваш комментарий *</label>
        <textarea
          class="form-control border"
          rows="5"
          id="contactcomment"
          required=""
          v-model="content"
        ></textarea>
      </div>
      <button
        type="button"
        class="mt-3 btn customBtn btn-block py-3"
        @click="sendComment()"
      >
        Отправить
      </button>
    </form>
    <rec-comment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      @add-parent="addParent"
    />
  </div>
</template>

<script>
import RecComment from "@/components/posts/PostsRecComment.vue";
import { sendComment } from "../../apiPosts";

export default {
  name: "RootComment",
  components: { RecComment },
  props: {
    comments: {
      type: Array,
    },
    post_id: {
      type: Number,
    },
    typePost: {
      type: String,
    },
  },
  emits: {
    "update-page": null,
  },
  data() {
    return {
      content: "",
      parent: null,
    };
  },
  methods: {
    async sendComment() {
      const body = {
        content: this.content,
        parent: this.parent,
      };
      await sendComment(this.typePost, this.post_id, body).then(() => {
        this.clearForm();
        this.$emit("update-page", this.post_id);
      });
    },
    addParent(commentId) {
      this.parent = commentId;
    },
    clearForm() {
      this.content = "";
      this.parent = null;
    },
  },
};
</script>

<style scoped></style>
