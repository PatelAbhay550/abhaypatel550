import React from 'react'
import SpotlightCard from '../components/Spotlight'

const page = () => {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center pt-6 font-sans">
      <h1 className="text-4xl font-bold text-blue-600 pb-4">My Ideal Techstack</h1>
      <SpotlightCard />
      
    </main>
  )
}

export default page