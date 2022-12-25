package controllers

import (
	"feeds-articles/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllArticles(c *gin.Context) {

	var articles []models.Article

	result := models.DB.Find(&articles)

	fmt.Println(result.RowsAffected)

	c.JSON(http.StatusOK, gin.H{"success": true, "data": articles})
}

func GetArticle(c *gin.Context) {

}

func CreateArticle(c *gin.Context) {
	var article models.Article

	if err := c.ShouldBindJSON(&article); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": err.Error()})
		return
	}

	result := models.DB.Create(&article)

	fmt.Println(result.Error)

	c.JSON(http.StatusCreated, gin.H{"success": true, "data": article, "message": ""})
}

func UpdateArticle(c *gin.Context) {}

func DeleteArticle(c *gin.Context) {}
