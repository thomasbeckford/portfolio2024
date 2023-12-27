'use client'

import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Badge,
  Link,
  Center,
} from '@chakra-ui/react'
import { Fade } from 'react-reveal'
import { useState } from 'react'
import ProjectsArray from '../utils/ProjectsArray'
import OtherProjectsArray from '../utils/OtherProjectsArray'
import TagsArray from '../utils/TagsArray'
import Image from 'next/image'

export default function Projects({ color }: { color: string }) {
  const projects = ProjectsArray()
  const others = OtherProjectsArray()
  const options = TagsArray('ProjectsTags')

  const [selected, setSelected] = useState('All')

  const handleSelected = (value: any) => {
    setSelected(value)
  }

  return (
    <>
      <Container maxW={'3xl'} id="projects" pt={20}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" p={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800}>
                03
              </Text>
              <Text fontWeight={800}>Projects</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Stack px={4} spacing={4}>
            {projects.map((project: any) => (
              <Fade bottom key={project.name}>
                <Card
                  direction={{
                    base: 'column',
                  }}
                  overflow="hidden"
                >
                  <Stack>
                    <CardBody textAlign="left">
                      <HStack justifyContent="space-between" spacing={4}>
                        <Stack align={'flex-start'} spacing={2}>
                          <Heading size="md">{project.name}</Heading>
                          <Text py={2}>{project.description}</Text>
                        </Stack>
                        <Image
                          objectFit="contain"
                          height={130}
                          width={130}
                          unoptimized={true}
                          src={project.image}
                          alt="cover"
                        />
                      </HStack>

                      <HStack py={2}>
                        {project.buttons.map((button: any) => (
                          <a key={button.text} href={button.href}>
                            <Button color={`${color}.400`}>
                              {button.text}
                            </Button>
                          </a>
                        ))}
                      </HStack>
                      <HStack pt={4} spacing={2}>
                        {project.badges.map((badge: any) => (
                          <Badge
                            key={badge.text}
                            colorScheme={badge.colorScheme}
                          >
                            {badge.text}
                          </Badge>
                        ))}
                      </HStack>
                    </CardBody>
                  </Stack>
                </Card>
              </Fade>
            ))}
          </Stack>
          <Text color={'gray.600'} fontSize={'xl'} px={4}>
            Other Projects
          </Text>
          <Center px={4}>
            <ButtonGroup variant="outline">
              <Button
                colorScheme={selected === 'All' ? `${color}` : 'gray'}
                onClick={() => handleSelected('All')}
              >
                All
              </Button>
              {options.map((option: any) => (
                <Button
                  key={option.value}
                  colorScheme={selected === option.value ? `${color}` : 'gray'}
                  onClick={() => handleSelected(option.value)}
                >
                  {option.value}
                </Button>
              ))}
            </ButtonGroup>
          </Center>
          <SimpleGrid columns={[1, 2, 3]} px={4} spacing={4}>
            {others
              .filter((other: any) => {
                if (selected === 'All') {
                  return true
                } else {
                  return other.tags.includes(selected)
                }
              })
              .map((other: any) => (
                <Fade bottom key={other.name}>
                  <Card>
                    <Stack>
                      <CardBody textAlign="left" h={[null, '40vh']}>
                        <Heading size="sm">{other.name}</Heading>

                        <Text fontSize="sm" py={2}>
                          {other.description}
                        </Text>

                        <HStack spacing={2}>
                          {other.buttons.map((button: any) => (
                            <Link
                              key={button.text}
                              href={button.href}
                              color={`${color}.400`}
                            >
                              {button.text}
                            </Link>
                          ))}
                        </HStack>
                        <HStack flexWrap="wrap" pt={4} spacing={2}>
                          {other.badges.map((badge: any) => (
                            <Badge
                              my={2}
                              key={badge.text}
                              colorScheme={badge.colorScheme}
                            >
                              {badge.text}
                            </Badge>
                          ))}
                        </HStack>
                      </CardBody>
                    </Stack>
                  </Card>
                </Fade>
              ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  )
}
