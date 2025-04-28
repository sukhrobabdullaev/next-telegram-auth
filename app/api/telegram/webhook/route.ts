import { Telegraf, Context } from "telegraf";
import { connectToDatabase } from "@/lib/mogoose";
import Otp from "@/models/otp";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

// Initialize bot with error handling
const bot = new Telegraf(process.env.BOT_TOKEN!);

// Error handling middleware
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}:`, err);
  ctx.reply("An error occurred while processing your request.");
});

// Connect to database once
connectToDatabase()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

// Helper: send contact request
async function askForContact(ctx: Context) {
  const userName = ctx.from?.first_name || "there";
  await ctx.reply(
    `🇺🇿
Salom ${userName} 👋
@baraka_b00k'ning rasmiy botiga xush kelibsiz

⬇ Kontaktingizni yuboring (tugmani bosib)

🇺🇸
Hi ${userName} 👋
Welcome to @baraka_b00k's official bot

⬇ Send your contact (by clicking button)

🇰🇷
안녕하세요, ${userName}👋
@baraka_b00k 공식 봇에 오신 것을 환영합니다.

⬇ 연락처 보내기 (버튼을 클릭해서)`,
    {
      reply_markup: {
        keyboard: [[{ text: "📱Share Contact ", request_contact: true }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
}

// Helper: send OTP and instructions
async function sendOtp(
  ctx: Context,
  phone: string,
  telegramData: {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
  }
) {
  // Check for valid OTP
  const recentOtp = await Otp.findOne({
    phoneNumber: phone,
    expiresAt: { $gt: new Date() },
  });

  if (recentOtp) {
    await ctx.reply(
      `🔒Eski kodingiz hali ham kuchda☝️ 
      \n🇰🇷 이전 코드가 여전히 유효합니다. ☝️
      \n🇺🇸 Your previous code is still valid ☝️`
    );
    return;
  }

  // Generate new OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 1 * 60 * 1000);

  await Otp.create({
    phoneNumber: phone,
    otp,
    expiresAt,
    telegramData,
  });

  await ctx.reply(
    `🔒 Code: <code>${otp}</code>\n\n🇺🇿 Yangi kod olish uchun /login ni bosing\n🇰🇷 새 코드를 얻으려면 /login 을 누르세요.\n🇺🇸 To get a new code click /login`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔄 Yangilash/Update",
              callback_data: "generate_new_code",
            },
          ],
        ],
      },
    }
  );
}

// /start and /login
bot.command(["start", "login"], async (ctx: Context) => {
  const userId = ctx.from?.id;
  if (!userId) return;

  // Try to find the user in the database
  const user = await User.findOne({ telegramId: userId });

  if (!user) {
    // Not found, ask for contact
    await askForContact(ctx);
    return;
  }

  // User exists, send OTP directly
  await sendOtp(ctx, user.phoneNumber, {
    id: user.telegramId,
    first_name: user.firstName,
    last_name: user.lastName,
    username: user.username,
  });
});

bot.on("contact", async (ctx: Context) => {
  const contact =
    ctx.message && "contact" in ctx.message
      ? (ctx.message as any).contact
      : undefined;
  if (!contact) {
    await ctx.reply(
      "🇺🇿 Kontaktingizni yuboring! \n 🇰🇷 전화번호 정보가 필요합니다! \n 🇺🇸 I need your contact information!"
    );
    return;
  }
  const phone = contact.phone_number;
  const userId = ctx.from?.id;
  if (!userId) return;

  // Save or update user in DB
  await User.findOneAndUpdate(
    { phoneNumber: phone },
    {
      phoneNumber: phone,
      telegramId: ctx.from.id,
      firstName: ctx.from.first_name,
      lastName: ctx.from.last_name,
      username: ctx.from.username,
      lastLogin: new Date(),
    },
    { upsert: true, new: true }
  );

  // Use Telegram data from ctx.from
  await sendOtp(ctx, phone, {
    id: ctx.from.id,
    first_name: ctx.from.first_name,
    last_name: ctx.from.last_name,
    username: ctx.from.username,
  });

  // Remove the keyboard after contact is shared
  await ctx.reply(
    "🇺🇿 Thank you for sharing your contact. \n 🇰🇷 연락처를 공유해 주셔서 감사합니다. \n 🇺🇸 Thank you for sharing your contact.",
    {
      reply_markup: { remove_keyboard: true },
    }
  );
});

// Handle callback query for generating new code
bot.action("generate_new_code", async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return;

  // Try to find the user in the database
  const user = await User.findOne({ telegramId: userId });

  if (!user) {
    await askForContact(ctx);
    return;
  }

  const phone = user.phoneNumber;

  // Find existing OTP
  const existingOtp = await Otp.findOne({
    phoneNumber: phone,
    expiresAt: { $gt: new Date() },
  });

  if (existingOtp) {
    // OTP is not expired, don't generate a new one
    await ctx.answerCbQuery(
      "Joriy kodingiz hali amal qiladi. Iltimos, mavjud kodni ishlating."
    );
    try {
      await ctx.editMessageText(
        `Your current code is still valid.\n🔒 Code: <code>${existingOtp.otp}</code>\n\n🇺🇿 Yangi kod olish uchun /login ni bosing\n🇰🇷 새 코드를 얻으려면 /login 을 누르세요.\n🇺🇸 To get a new code click /login`,
        {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "🔄 Yangilash/Update",
                  callback_data: "generate_new_code",
                },
              ],
            ],
          },
        }
      );
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message.includes("message is not modified")
      ) {
        // Message content hasn't changed, ignore this error
        console.log("Message content not modified, ignoring error");
      } else {
        // For other errors, log and possibly handle them
        console.error("Error editing message:", error);
      }
    }
    return;
  }

  // Generate new OTP
  const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

  // Create new OTP or update existing one
  await Otp.findOneAndUpdate(
    { phoneNumber: phone },
    {
      otp: newOtp,
      expiresAt: expiresAt,
      telegramData: {
        id: ctx.from.id,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
        username: ctx.from.username,
      },
    },
    { upsert: true, new: true }
  );

  // Send new OTP
  await ctx.editMessageText(
    `🔒 Yangi kod: ${newOtp}\n\n🇺🇿 Yangi kod olish uchun /login ni bosing\n🇺🇸 To get a new code click /login`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔄 Yangilash/Update",
              callback_data: "generate_new_code",
            },
          ],
        ],
      },
    }
  );

  // Answer the callback query
  await ctx.answerCbQuery("New code generated!");
});

bot.command("test", async (ctx) => {
  await ctx.reply("Test command working!");
});

// Handle unneeded messages
bot.on("message", async (ctx) => {
  try {
    await ctx.reply(
      "🇺🇿 Kechirasiz, men bu xabarni tushunmadim. Iltimos, mavjud buyruqlardan foydalaning.\n" +
        "🇰🇷 죄송합니다. 이 메시지를 이해하지 못했습니다. 사용 가능한 명령어를 사용해 주세요.\n" +
        "🇺🇸 Sorry, I didn't understand that message. Please use the available commands."
    );
  } catch (error) {
    console.error("Error handling unneeded message:", error);
    await ctx.reply("An error occurred while processing your message.");
  }
});

export async function POST(req: NextRequest) {
  try {
    // Verify BOT_TOKEN is set
    if (!process.env.BOT_TOKEN) {
      console.error("BOT_TOKEN is not set in environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Get the raw body first
    const rawBody = await req.text();

    // Log the raw request for debugging
    console.log("Raw request body:", rawBody);

    // Check if body is empty
    if (!rawBody) {
      console.log(
        "Empty request body received - this might be a webhook setup request"
      );
      return NextResponse.json({ status: "ok" });
    }

    // Try to parse the JSON
    let update;
    try {
      update = JSON.parse(rawBody);
    } catch (e) {
      console.error("Invalid JSON received:", rawBody);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // Log the parsed update
    console.log("Parsed update:", JSON.stringify(update, null, 2));

    // Handle the update
    await bot.handleUpdate(update);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
