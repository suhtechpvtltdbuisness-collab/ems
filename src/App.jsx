import { useState } from 'react'

import './App.css'
import { AuthProvider} from './context/AuthContext'
import MainLayout from './assets/components/layout/MainLayout'
import DashboardContent from './assets/components/dashboard/DashboardContent'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <>
    //   <div>
    //     {/* <Login /> */}
    //     {/* <AuthPage /> */}
    //     <DashboardContent />
    //   </div>
    // </>
    <AuthProvider>
      <MainLayout>
        <DashboardContent />
      </MainLayout>
    </AuthProvider>
  )
}

export default App
