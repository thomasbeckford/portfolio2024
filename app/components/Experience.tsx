'use client'

import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Badge,
  Image,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Fade } from 'react-reveal'
import { useState, useEffect } from 'react'
import ExperienceArray from '../utils/ExperienceArray'
import TagsArray from '../utils/TagsArray'

export default function Experience({ color }: { color: string }) {
  const experience = ExperienceArray()
  const options = TagsArray('ExperienceTags')
  const [selected, setSelected] = useState('')

  useEffect(() => {
    if (options.length > 0) {
      setSelected(options[0].value)
    }
  }, [options])

  const handleSelected = (value: string) => {
    setSelected(value)
  }

  return (
    <>
      <Container maxW={'3xl'} id="experience" pt={20}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" px={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800}>
                02
              </Text>
              <Text fontWeight={800}>Experience</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>

          <Stack px={4} spacing={4}>
            {experience
              .filter((exp: any) => exp.tags.includes(selected))
              .map((exp: any) => (
                <Fade bottom key={exp.company}>
                  <Card key={exp.company} size="sm">
                    <CardHeader>
                      <Flex justifyContent="space-between">
                        <HStack>
                          <Image
                            src={exp.image}
                            h={50}
                            w={50}
                            alt="company logo"
                          />
                          <Box px={2} textAlign="left">
                            <Text fontWeight={600}>{exp.company}</Text>
                            <Text>{exp.position}</Text>
                          </Box>
                        </HStack>
                        <Text px={2} fontWeight={300}>
                          {exp.duration}
                        </Text>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Flex>
                        <List textAlign="left" spacing={3}>
                          {exp.listItems.map((item: any, index: any) => (
                            <ListItem key={index}>
                              <ListIcon
                                boxSize={6}
                                as={ChevronRightIcon}
                                color={`${color}.500`}
                              />
                              {item}asdf
                            </ListItem>
                          ))}
                        </List>
                      </Flex>
                    </CardBody>
                    <CardFooter>
                      <HStack spacing={2}>
                        {exp.badges.map((badge: any) => (
                          <Badge
                            key={badge.name}
                            colorScheme={badge.colorScheme}
                          >
                            {badge.name}
                          </Badge>
                        ))}
                      </HStack>
                    </CardFooter>
                  </Card>
                </Fade>
              ))}
          </Stack>
        </Stack>
      </Container>
    </>
  )
}
