import { NextResponse } from "next/server"
import { sendToTelegram, formatOrderForTelegram } from "@/lib/telegram"

export async function POST(request: Request) {
  try {
    const order = await request.json()

    // Validate order data
    if (!order.firstName || !order.lastName || !order.phone || !order.location || !order.items) {
      return NextResponse.json({ error: "Missing required order information" }, { status: 400 })
    }

    // Format the order for Telegram
    const telegramMessage = formatOrderForTelegram(order)

    // Send to Telegram
    const sent = await sendToTelegram(telegramMessage)

    if (sent) {
      // Here you would typically save the order to a database
      return NextResponse.json({ success: true, message: "Order placed successfully" }, { status: 200 })
    } else {
      return NextResponse.json({ error: "Failed to send order to Telegram" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error processing order:", error)
    return NextResponse.json({ error: "An error occurred while processing your order" }, { status: 500 })
  }
}
