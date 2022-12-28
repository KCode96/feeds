package api

import (
	c "feeds-articles/controllers"
	m "feeds-articles/middlewares"

	"github.com/gin-gonic/gin"
)

func AritcleRoute(r *gin.Engine) {
	endpoint := "/api/articles"

	r.GET(endpoint, c.GetAllArticles)
	r.GET(endpoint+"/local", m.Auth(), c.GetLocalArticles)
	r.POST(endpoint, m.Auth(), c.CreateArticle)

	r.GET(endpoint+"/:id", c.GetArticle)
	r.PUT(endpoint+"/:id", c.UpdateArticle)
	r.DELETE(endpoint+"/:id", c.DeleteArticle)
	r.GET(endpoint+"/:id/like", m.Auth(), c.LikeArticle)
	r.GET(endpoint+"/:id/unlike", m.Auth(), c.UnlikeArticle)

	r.GET(endpoint+"/author/:id", c.GetArticlesByAuthorId)
	r.GET(endpoint+"/author/:id/favorite", c.GetFavouriteArticlesByAuthorId)
}
