package controllers

import (
	"encoding/json"
	"feeds-articles/models"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Response struct {
	Data    models.Author `json:"data"`
	Message string        `json:"message"`
	Success bool          `json:"success"`
}

func GetAllArticles(c *gin.Context) {

	var articles []*models.Article

	result := models.DB.Find(&articles)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": "Unable to get tags!"})
		return
	}

	var response *Response

	for i, a := range articles {

		res, _ := http.Get("http://localhost:3001/api/users/" + a.AuthorId)

		body, _ := ioutil.ReadAll(res.Body)

		json.Unmarshal(body, &response)

		articles[i].Author = response.Data

	}

	c.JSON(http.StatusOK, gin.H{"success": true, "data": articles, "message": ""})
}

func GetArticle(c *gin.Context) {

	id := c.Param("id")

	var article models.Article

	result := models.DB.Find(&article, id)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": "Unable to find tag with " + id})
		return
	}

	var response Response

	res, _ := http.Get("http://localhost:3001/api/users/63a70ba1e1257dc0e1915706")

	body, _ := ioutil.ReadAll(res.Body)

	json.Unmarshal(body, &response)

	article.Author = response.Data

	c.JSON(http.StatusOK, gin.H{"success": true, "data": article, "message": ""})
}

func CreateArticle(c *gin.Context) {
	authorId := c.MustGet("id").(string)

	var article models.Article

	if err := c.ShouldBindJSON(&article); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": err.Error()})
		return
	}

	// Set empyt array
	article.Likes = []string{}
	article.AuthorId = authorId

	result := models.DB.Create(&article)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": result.Error.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"success": true, "data": article})
}

func UpdateArticle(c *gin.Context) {}

func DeleteArticle(c *gin.Context) {
	id := c.Param("id")

	var article models.Article

	// Find the tag with the given ID
	result := models.DB.Delete(&article, id)

	if result.Error != nil || result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": "Unable to find tag with " + id})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true})
}

func GetArticlesByAuthorId(c *gin.Context) {
	aid := c.Param("id")

	var articles []*models.Article

	result := models.DB.Where(&models.Article{AuthorId: aid}).Find(&articles)

	if result.Error != nil || result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": "Unable to find tag with " + aid})
		return
	}

	var response *Response

	for i, a := range articles {

		res, _ := http.Get("http://localhost:3001/api/users/" + a.AuthorId)

		body, _ := ioutil.ReadAll(res.Body)

		json.Unmarshal(body, &response)

		articles[i].Author = response.Data

	}

	c.JSON(http.StatusOK, gin.H{"success": true, "data": articles, "message": ""})
}

func LikeArticle(c *gin.Context) {
	aid := c.Param("id")
	uid := c.MustGet("id").(string)

	var article *models.Article

	result := models.DB.First(&article, aid)

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"data": nil, "success": false, "message": "Unable to find tag with " + aid})
		return
	}

	var isLiked bool

	// add the liker
	for _, v := range article.Likes {
		if v == uid {
			isLiked = true
			break
		}
	}

	if isLiked {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	article.Likes = append(article.Likes, uid)

	// increase the like
	article.LikesCount++

	models.DB.Save(&article)

	fmt.Println(article)

	c.JSON(http.StatusOK, gin.H{"success": true, "data": article, "message": ""})
}

func UnlikeArticle(c *gin.Context) {
	aid := c.Param("id")
	uid := c.MustGet("id").(string)

	var article models.Article

	result := models.DB.First(&article, aid)

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"data": nil, "success": false, "message": "Unable to find tag with " + aid})
		return
	}

	var isLiked bool
	for _, v := range article.Likes {
		if v == uid {
			isLiked = true
		} else {
			isLiked = false
		}
	}

	if !isLiked {
		c.AbortWithStatus(400)
		return
	}

	var likes []string
	for _, v := range article.Likes {
		if v != uid {
			likes = append(likes, v)
		}
	}

	if likes == nil {
		article.Likes = []string{}
	} else {
		article.Likes = likes
	}

	// substract the like
	article.LikesCount--

	models.DB.Save(&article)

	c.JSON(http.StatusOK, gin.H{"success": true, "data": article, "message": ""})
}
