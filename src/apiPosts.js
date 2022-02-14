import { api } from "./http.js";

export const loadListArticles = async (
  pageNumber = 1,
  categoryId = "",
  searchArticles = ""
) => {
  return await api
    .get(
      `/articles/?page=${pageNumber}&category=${categoryId}&search=${searchArticles}`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.data);
    });
};

export const loadTopArticles = async () => {
  return await api
    .get("articles/top")
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const loadSingleArticle = async (id) => {
  return await api
    .get(`/articles/${id}`)
    .then((response) => response.data)
    .catch((error) => error.data);
};

export const changeArticleRating = async (id, rating) => {
  return await api
    .patch(`/articles/${id}/change_rating/`, {
      rating: rating,
    })
    .then((response) => {
      return response.data.rating;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const sendComment = async (typePost, postId, body) => {
  return await api.post(`/${typePost}/${postId}/comments/`, body);
};

export const loadListNews = async (pageNumber = 1, searchArticles = "") => {
  return await api
    .get(`/news/?page=${pageNumber}&search=${searchArticles}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.data);
    });
};

export const loadSingleNews = async (id) => {
  return await api
    .get(`/news/${id}`)
    .then((response) => response.data)
    .catch((error) => error.data);
};

export const loadCategorys = async () => {
  return await api.get("/category/").then((response) => response.data);
};

export const sendArticle = async (data) => {
  return await api.post("/articles/", data);
};

export const sendNews = async (data) => {
  return await api.post("/news/", data);
};
