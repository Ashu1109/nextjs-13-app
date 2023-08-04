import '../styles/app.scss'
import { ContextProvider } from '@/components/Clients'
import Header from './header'
export const metadata = {
  title: 'Todo App',
  description: 'Todo app Made For Good People',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
        <>
        <Header />
        {children}
        </>
        </ContextProvider>
        </body>
    </html>
  )
}
