<template>
  <div class="d-flex flex-column side">
    <div class="mt-5">
      <h3 class="sear-head">Top</h3>
      <div v-for="article in listTopArticles" :key="article.id" class="mt-3">
        <h6>
          <router-link
            :to="{ name: 'article', params: { articleId: article.id } }"
            style="color: black"
            >{{ article.headline }}</router-link
          >
        </h6>
        <div>Date: 121212</div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadTopArticles } from "@/apiPosts.js";

export default {
  name: "PostsSideBar",
  data() {
    return {
      listTopArticles: [],
    };
  },
  created() {
    this.updateListTopArticles();
  },
  methods: {
    async updateListTopArticles() {
      this.listTopArticles = await loadTopArticles();
    },
  },
};
</script>

<style scoped>
.side {
  position: sticky;
  right: 0;
  top: 11%;
}
</style>
