package main

import (
	"net/http"
	"github.com/labstack/echo/v4"
	"github.com/joho/godotenv"
	"log"
	"os"
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
		return c.String(http.StatusOK, "Hello, World!")
	})
	
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	log.Println("Starting server on http://localhost:" + port)
	e.Logger.Fatal(e.Start(":" + port))

}