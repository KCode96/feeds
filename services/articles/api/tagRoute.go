package api

import (
	"feeds-articles/controllers"

	"github.com/gin-gonic/gin"
)

func TagRoute(r *gin.Engine) {
	endpoint := "/api/tags"

	r.GET(endpoint, controllers.GetTags)
	r.POST(endpoint, controllers.CreateTag)
	r.DELETE(endpoint, controllers.DeleteTag)
	r.PUT(endpoint, controllers.UpdateTag)
}
