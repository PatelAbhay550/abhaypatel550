import React from 'react'
import SpotlightCard from '../components/Spotlight'

const page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 pt-6 pb-16 font-sans">
      <h1 className="text-center text-4xl font-bold text-gray-900 pb-4 dark:text-white">My Ideal Techstack</h1>
      <p className="pb-8 text-sm font-semibold text-gray-500 dark:text-gray-400">
        Tools I reach for every single day.
      </p>
      <SpotlightCard />
    </main>
  )
}

export default page