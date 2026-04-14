package main

import (
	"log"

	"github.com/axolotl-go/Netzahualcoyotl/internal/config"
	"github.com/axolotl-go/Netzahualcoyotl/internal/contact"
	"github.com/axolotl-go/Netzahualcoyotl/internal/db"
	"github.com/axolotl-go/Netzahualcoyotl/internal/http"
	"github.com/axolotl-go/Netzahualcoyotl/internal/user"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	db.DB.AutoMigrate(&user.User{}, &contact.ContactRequest{})
	app := fiber.New()
	app.Use(cors.New(config.CorsConfig()))

	http.SetupRouter(app)

	log.Fatal(app.Listen(":8080"))
}
