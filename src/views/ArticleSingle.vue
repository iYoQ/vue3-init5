<template>
  <posts-single
    :post="article"
    @change-rating="updateArticleRating"
    @update-page="updateArticle"
  />
</template>

<script>
import PostsSingle from "@/components/posts/PostsSingle.vue";
import { loadSingleArticle, changeArticleRating } from "@/apiPosts.js";

export default {
  name: "ArticleSingle",
  components: { PostsSingle },
  props: {
    articleId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      article: {},
    };
  },
  created() {
    this.updateArticle(this.articleId);
  },
  methods: {
    async updateArticle(articleId) {
      this.article = await loadSingleArticle(articleId);
    },
    async updateArticleRating(articleId, ratingValue) {
      const response = await changeArticleRating(articleId, ratingValue);
      alert(response);
      this.updateArticle(articleId);
    },
  },
  beforeRouteUpdate(to) {
    this.updateArticle(to.params.articleId);
  },
};
</script>

<style scoped></style>
