import ProductsPageContent from '@/widgets/ProductsPageContent'
import { ProtectedRoute } from '@/lib/auth/ProtectedRoute'
import { ToastContainer } from '@/features/showToasts'

export default function HomePage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen py-5 relative">
        <ProductsPageContent />
        <ToastContainer />
      </main>
    </ProtectedRoute>
  )
}