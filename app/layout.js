import './globals.css'
import { Inter, Saira_Condensed, Roboto } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const sairaCondensed = Saira_Condensed({ weight: "500", subsets: ['latin'] })
const roboto = Roboto({ weight: "400", subsets: ['latin'] })

export const metadata = {
  title: 'the realest fake omegle',
  description: 'Omegle',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
