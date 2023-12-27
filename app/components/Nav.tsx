'use client'

import {
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useColorModeValue,
  Stack,
  useColorMode,
  IconButton,
  useMediaQuery,
  useDisclosure,
  Link,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
} from '@chakra-ui/react'
import {
  MoonIcon,
  SunIcon,
  HamburgerIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons'

export default function Nav({
  setColor,
}: {
  setColor: (color: string) => void
}) {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isLargerThanMD] = useMediaQuery('(min-width: 48em)')

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(`#${sectionId}`)
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  const colors = {
    blue: '#3182CE',
    cyan: '#00B5D8',
    gray: '#718096',
    green: '#38A169',
    orange: '#DD6B20',
    pink: '#D53F8C',
    purple: '#805AD5',
    red: '#E53E3E',
    teal: '#319795',
    yellow: '#D69E2E',
  }

  return (
    <>
      <Flex
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        h={16}
        zIndex="sticky"
        position="fixed"
        as="header"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
      >
        <Link onClick={() => scrollToSection('hero')}>T B</Link>

        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            {isLargerThanMD ? (
              <>
                <HStack
                  align={'center'}
                  spacing={4}
                  display={{ base: 'none', md: 'flex' }}
                >
                  {Object.keys(colors).map((color: string) => (
                    <Button
                      key={color}
                      onClick={() => setColor(color)}
                      bg={color}
                      size="xs"
                      borderRadius="full"
                      sx={{
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    ></Button>
                  ))}
                </HStack>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('about')}
                >
                  About
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('experience')}
                >
                  Experience
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('projects')}
                >
                  Projects
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('contact')}
                >
                  Contact
                </Button>
              </>
            ) : (
              <></>
            )}
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>

            {isLargerThanMD ? (
              <></>
            ) : (
              <>
                <Button
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  onClick={onOpen}
                ></Button>
                <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerBody>
                      <Button
                        variant="ghost"
                        onClick={() => scrollToSection('about')}
                      >
                        About
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => scrollToSection('experience')}
                      >
                        Experience
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => scrollToSection('projects')}
                      >
                        Projects
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => scrollToSection('contact')}
                      >
                        Contact
                      </Button>
                      <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                          Change color
                        </MenuButton>
                        <MenuList>
                          <MenuItem sx={{ background: 'transparent' }}>
                            <SimpleGrid columns={6} spacing={5}>
                              {Object.keys(colors).map((color) => (
                                <Button
                                  key={color}
                                  onClick={() => setColor(color)}
                                  bg={color}
                                  size="xs"
                                  borderRadius="full"
                                />
                              ))}
                            </SimpleGrid>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </>
            )}
          </Stack>
        </Flex>
      </Flex>
    </>
  )
}
