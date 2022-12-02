package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllArticles(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{"success": true, "data": "some-articles"})
}

func GetArticle(c *gin.Context) {

}

func CreateArticle(c *gin.Context) {

}

func UpdateArticle(c *gin.Context) {}

func DeleteArticle(c *gin.Context) {}
