export async function sendToTelegram(message: string) {
  // This is a placeholder for the actual Telegram API integration
  // You would need to implement this with your bot token and group ID

  try {
    // Example implementation:
    // const response = await fetch(
    //   `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       chat_id: process.env.TELEGRAM_GROUP_ID,
    //       text: message,
    //       parse_mode: "HTML",
    //     }),
    //   }
    // );

    // const data = await response.json();
    // return data.ok;

    // For now, we'll just return true to simulate success
    return true
  } catch (error) {
    console.error("Error sending message to Telegram:", error)
    return false
  }
}

export function formatOrderForTelegram(order: any) {
  // Format the order details for Telegram message
  let message = `<b>New Order: ${order.id}</b>\n\n`

  message += `<b>Customer:</b> ${order.firstName} ${order.lastName}\n`
  message += `<b>Phone:</b> ${order.phone}\n`
  message += `<b>Location:</b> ${order.location}\n\n`

  message += "<b>Order Items:</b>\n"

  order.items.forEach((item: any) => {
    message += `- ${item.title} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}\n`
  })

  message += `\n<b>Total:</b> $${order.total.toFixed(2)}`

  if (order.notes) {
    message += `\n\n<b>Notes:</b> ${order.notes}`
  }

  return message
}
