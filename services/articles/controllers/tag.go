package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateTag(c *gin.Context) {

}

func UpdateTag(c *gin.Context) {

}

func DeleteTag(c *gin.Context) {

}

func GetTags(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"data": "some-tags"})
}
