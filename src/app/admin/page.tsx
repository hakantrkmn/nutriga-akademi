import AdminLogin from './components/AdminLogin'

export default function AdminPage() {
  // Bu sayfa sadece giriş yapmamış adminler için
  // Giriş yapmış adminler dashboard'a yönlendirilir
  return <AdminLogin />
}
