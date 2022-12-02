package controllers

import (
	"feeds-articles/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateTag(c *gin.Context) {

	var body struct {
		Name string
	}

	c.Bind(&body)

	tag := models.Tag{Name: body.Name}

	result := models.DB.Create(&tag)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": "Failed to create tag"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"success": true, "data": tag})
}

func GetTag(c *gin.Context) {
	id := c.Param("id")

	var tag models.Tag

	result := models.DB.Find(&tag, id)

	if result.Error != nil || result.RowsAffected == 0{
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": "Unable to find tag with " + id})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true, "data": tag,
	})

}

func UpdateTag(c *gin.Context) {

}

func DeleteTag(c *gin.Context) {
	id := c.Param("id")

	tag := models.Tag{ID: id}

	// Find the tag with the given ID
	findResult := models.DB.Find(&tag)

	if findResult.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": "Unable to find tag with " + id})
		return
	}

	result := models.DB.Delete(&tag)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": "Unable to delete tag with " + id})
		return
	}

	c.JSON(http.StatusAccepted, gin.H{"success": true})
}

func GetTags(c *gin.Context) {

	var tags []models.Tag

	result := models.DB.Find(&tags)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": nil, "success": false, "message": "Unable to get tags!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "data": tags})
}
