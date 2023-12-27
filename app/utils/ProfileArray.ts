import { useState, useEffect } from 'react'

const parseProfile = (mdContent: string) => {
  const profile = {
    siteName: '',
    headerName: '',
    headerRole: '',
    headerDesc: '',
    about: '',
    contact: '',
    linkedin: '',
    github: '',
    email: '',
    logo: '',
  } as Record<string, string>

  const lines = mdContent.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      const section = line.substring(3).trim()

      switch (section) {
        case 'Header':
          profile.headerName = lines[++i].substring(2).trim()
          profile.headerRole = lines[++i].substring(2).trim()
          profile.headerDesc = lines[++i].substring(2).trim()
          break
        case 'About':
          profile.about = lines[++i].trim()
          break
        case 'Contact':
          profile.contact = lines[++i].trim()
          const contactLinks = ['LinkedIn', 'GitHub', 'Email']
          for (const link of contactLinks) {
            const linkLine = lines[++i].substring(2).trim()
            if (linkLine.startsWith(link)) {
              ;(profile as Record<string, string>)[link.toLowerCase()] =
                linkLine.split(': ')[1].trim()
            }
          }
          break
        case 'Logo':
          profile.logo = lines[++i].substring(2).trim()
          break
        default:
          // do nothing
          break
      }
    }
  }

  return profile
}

const ProfileArray = () => {
  const [profile, setProfile] = useState({
    siteName: '',
    headerName: '',
    headerRole: '',
    headerDesc: '',
    about: '',
    contact: '',
    linkedin: '',
    github: '',
    email: '',
    logo: '',
  })

  useEffect(() => {
    fetch('/content/Profile.md')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch markdown content')
        }
        return response.text()
      })
      .then((mdContent) => {
        const parsedProfile = parseProfile(mdContent)

        setProfile((prevProfile) => ({
          ...prevProfile,
          ...parsedProfile,
        }))
      })
      .catch((error) => {
        console.error('Error fetching markdown content:', error)
      })
  }, [])

  return profile
}

export default ProfileArray
