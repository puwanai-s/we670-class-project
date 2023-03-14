import { AuthContextProvider } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'sweetalert2/dist/sweetalert2.css';
import '@/styles/globals.css'

const noAuthRequired = ['/', '/login', '/register', '/about', '/contact', '/detail/[id]', '/tag/[tag]']

export default function App({ Component, pageProps }) {

  const router = useRouter();
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle');
  }, []);

  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ?
        <Component {...pageProps} /> :
        (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
    </AuthContextProvider>
  )
}
