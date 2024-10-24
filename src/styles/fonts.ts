import { Bellefair, Lato } from 'next/font/google'
 
export const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-lato',
})
 
export const bellefair = Bellefair({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  style: 'normal',
  variable: '--font-bellefair',
})