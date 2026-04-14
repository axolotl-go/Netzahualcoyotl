package contact

import (
	"strings"

	"github.com/axolotl-go/Netzahualcoyotl/internal/db"
	"github.com/gofiber/fiber/v2"
)

func CreateContact(c *fiber.Ctx) error {
	var input ContactRequest

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	// Validación mínima
	if input.Name == "" || input.Email == "" || input.Message == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "All fields are required",
		})
	}

	// Normalización básica
	input.Email = strings.ToLower(strings.TrimSpace(input.Email))
	input.Name = strings.TrimSpace(input.Name)

	if err := db.DB.Create(&input).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to save request",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Request submitted",
	})
}

func Viewer(c *fiber.Ctx) error {
	var contacts []ContactRequest

	if err := db.DB.
		Order("created_at DESC").
		Limit(50).
		Find(&contacts).Error; err != nil {

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch data",
		})
	}

	return c.Status(fiber.StatusOK).JSON(contacts)
}
