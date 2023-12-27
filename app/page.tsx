'use client'
import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import AnimatedIntro from './components/AnimatedIntro'
import { Stack } from '@chakra-ui/react'
import { Fade } from 'react-reveal'

export default function Home() {
  const [isAnimated, setIsAnimated] = useState(true)
  const [color, setColor] = useState('purple')

  useEffect(() => {
    setTimeout(() => {
      setIsAnimated(false)
    }, 600)
  }, [])

  return (
    <main>
      <AnimatedIntro isAnimated={isAnimated} />

      <Stack display={isAnimated ? 'none' : 'block'}>
        <Fade>
          <Nav setColor={setColor} />
          <Hero color={color} />
          <About color={color} />
          <Experience color={color} />
          <Projects color={color} />
          <Contact color={color} />
        </Fade>
      </Stack>
    </main>
  )
}
