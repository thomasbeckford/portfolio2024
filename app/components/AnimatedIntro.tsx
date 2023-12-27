import { Heading, Stack, Spinner, useColorModeValue } from '@chakra-ui/react'

type Props = {
  isAnimated: boolean
}

export default function AnimatedIntro(props: Props) {
  const { isAnimated } = props

  const bgColor = useColorModeValue('gray.800', 'gray.900')
  const textColor = useColorModeValue('white', 'gray.300')

  return (
    <Stack
      display={isAnimated ? 'flex' : 'none'}
      w="full"
      h="100vh"
      pb="20vh"
      alignItems="center"
      justifyContent="center"
      bg={bgColor}
      color={textColor}
    >
      <Heading
        as="h1"
        fontSize={{ base: '4xl', md: '6xl' }}
        fontWeight="bold"
        textAlign="center"
        mb="4"
      >
        {/* create a funny loading */}
        Loading...
      </Heading>
      <Spinner size="xl" color={textColor} />
    </Stack>
  )
}
