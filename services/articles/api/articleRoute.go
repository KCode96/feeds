package api

import (
	"feeds-articles/controllers"
	m "feeds-articles/middlewares"

	"github.com/gin-gonic/gin"
)

func AritcleRoute(r *gin.Engine) {
	endpoint := "/api/articles"

	r.GET(endpoint, controllers.GetAllArticles)
	r.POST(endpoint, controllers.CreateArticle)

	r.GET(endpoint+"/:id", controllers.GetArticle)
	r.PUT(endpoint+"/:id", controllers.UpdateArticle)
	r.DELETE(endpoint+"/:id", controllers.DeleteArticle)
	r.GET(endpoint+"/:id/like", m.Auth(), controllers.LikeArticle)
	r.GET(endpoint+"/:id/unlike", m.Auth(), controllers.UnlikeArticle)

	r.GET(endpoint+"/author/:id", controllers.GetArticlesByAuthorId)
}
