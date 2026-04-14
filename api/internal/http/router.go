package http

import (
	"github.com/axolotl-go/Netzahualcoyotl/internal/contact"
	"github.com/axolotl-go/Netzahualcoyotl/internal/user"
	"github.com/gofiber/fiber/v2"
)

func SetupRouter(app *fiber.App) {

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	api := app.Group("/api")

	api.Post("/user", user.Create)
	api.Post("/login", user.Login)

	api.Post("/Contact", contact.CreateContact)
	api.Get("/GetContact", contact.Viewer)

	api.Post("/verify", user.VerifyJWT)
}
