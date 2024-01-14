package main

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/wmnn/goLyricsFluencer/templates"
)

func loadEnv() {
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal("Error loading .env file.")
	}
}

func main() {
	loadEnv()

	e := echo.New()
	e.HideBanner = true
	e.HidePort = true
	e.GET("/", func(c echo.Context) error {
		component := templates.Index()
		return component.Render(context.Background(), c.Response().Writer)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	e.Static("/static", "static")
	e.Static("/css", "css")

	log.Println("Starting server on http://localhost:" + port)
	e.Logger.Fatal(e.Start(":" + port))

}
