export default function Home() {
  return (
    <main className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-gradient-to-br from-background to-accent/10">
      <div className="max-w-4xl w-full p-6 space-y-8">
        <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent animate-fade-in">
          Next.js Telegram Authentication
        </h1>
        <p className="text-lg text-center text-muted-foreground">
          A secure authentication system that leverages Telegram Bot API for OTP verification in Next.js applications.
        </p>
      </div>
    </main>
  )
}
