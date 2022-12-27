package api

import (
	"feeds-articles/controllers"

	"github.com/gin-gonic/gin"
)

func AritcleRoute(r *gin.Engine) {
	endpoint := "/api/articles"

	r.GET(endpoint, controllers.GetAllArticles)
	r.POST(endpoint, controllers.CreateArticle)

	r.GET(endpoint+"/:id", controllers.GetArticle)
	r.PUT(endpoint+"/:id", controllers.UpdateArticle)
	r.DELETE(endpoint+"/:id", controllers.DeleteArticle)
	r.GET(endpoint+"/:id/like", controllers.LikeArticle)

	r.GET(endpoint+"/author/:id", controllers.GetArticlesByAuthorId)
}
