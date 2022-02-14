<template>
  <posts-single :post="news" @update-page="updateNews" />
</template>

<script>
import PostsSingle from "@/components/posts/PostsSingle.vue";
import { loadSingleNews } from "@/apiPosts.js";

export default {
  name: "NewsSingle",
  components: { PostsSingle },
  props: {
    newsId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      news: {},
    };
  },
  created() {
    this.updateNews(this.newsId);
  },
  methods: {
    async updateNews(newsId) {
      this.news = await loadSingleNews(newsId);
    },
  },
};
</script>

<style scoped></style>
