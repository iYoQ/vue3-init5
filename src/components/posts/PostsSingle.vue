<template>
  <div class="py-md-5 py-4 single">
    <div class="container py-md-4">
      <div class="row gx-5">
        <div class="left-ads-display col-lg-8">
          <div class="row">
            <div class="desc1-right pl-lg-4">
              <h5 class="wrapped">{{ post.headline }}</h5>
              <ul class="pt-3">
                <li
                  v-if="typePost == 'articles'"
                  class="li-article pb-3 font-italic"
                >
                  <span
                    ><mark>{{ post.category }}</mark></span
                  >
                </li>
                <li class="li-article">
                  <span>{{ post.author }}</span>
                </li>
                <li class="li-article">
                  <span>{{ new Date(post.date_create).toDateString() }}</span>
                </li>
                <div class="row">
                  <li v-if="typePost == 'articles'" class="li-article">
                    <svg
                      @click="$emit('change-rating', post.id, -1)"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-dash-circle"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                      />
                      <path
                        d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
                      />
                    </svg>
                    <span class="text-success ms-1 me-1">
                      {{ post.rating }}
                    </span>
                    <svg
                      @click="$emit('change-rating', post.id, 1)"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-plus-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                      />
                    </svg>
                  </li>
                  <div class="d-flex">
                    <img src="" alt="" />
                    <li class="li-article">
                      <span>Views: {{ post.view_count }}</span>
                    </li>
                    <img src="" alt="" />
                    <li class="li-article ps-1">
                      <span>Comments: {{ post.comments_count }}</span>
                    </li>
                  </div>
                </div>
              </ul>
            </div>
          </div>
          <div class="sub-para-w3layouts mt-5">
            <p>
              <span v-html="post.content" class="content"> </span>
            </p>
          </div>
          <hr />
          <root-comment
            :comments="post.comments"
            :post_id="post.id"
            :typePost="typePost"
            @update-page="$emit('update-page', post.id)"
          />
        </div>
        <div class="col py-md-4">
          <posts-side-bar />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostsSideBar from "@/components/posts/PostsSideBar.vue";
import RootComment from "@/components/posts/PostsRootComment.vue";

export default {
  name: "PostsSingle",
  components: { PostsSideBar, RootComment },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  emits: {
    "change-rating": null,
    "update-page": null,
  },
  computed: {
    typePost() {
      return "rating" in this.post ? "articles" : "news";
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1100px;
}
.single {
  outline: none;
  outline-offset: -2px;
  cursor: inherit;
  color: rgb(33, 37, 41);
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0);
  font-family: Lato, sans-serif;
}
.li-article {
  list-style: none;
}
svg {
  cursor: pointer;
}
</style>
