import React from 'react'
import Wave from 'react-wavify'

const BackgroundWave = () => {
  return (
    <div style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100vw',
      zIndex: 1,
      pointerEvents: 'none',
    }} className='h-48 md:h-52 lg:h-60'>
      <Wave mask="url(#mask)" fill="#1277b0" >
  <defs>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop offset="0" stopColor="white" />
      <stop offset="0.5" stopColor="black" />
    </linearGradient>
    <mask id="mask">
      <rect x="0" y="0" width="2000" height="200" fill="url(#gradient)"  />
    </mask>
  </defs>
</Wave>
    </div>
  )
}

export default BackgroundWave