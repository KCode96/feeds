package api

import (
 	c "feeds-articles/controllers"

	"github.com/gin-gonic/gin"
)

func TagRoute(r *gin.Engine) {
	endpoint := "/api/tags"

	r.GET(endpoint, c.GetTags)
	r.POST(endpoint, c.CreateTag)

	r.GET(endpoint+"/:id", c.GetTag)
	r.DELETE(endpoint+"/:id", c.DeleteTag)
	r.PUT(endpoint+"/:id", c.UpdateTag)
}
