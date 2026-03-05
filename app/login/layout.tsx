export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex justify-center items-center min-h-screen">
        {children}
    </main>
  )
}