import { Container, Spacer, Text } from '@nextui-org/react'
import Button from '@nextui-org/react/button'
import { useContext } from 'react'

import { GlobalStateContext } from '../machines/GlobalStateProvider'

export default function HomeScreen() {
  const globalServices = useContext(GlobalStateContext)

  const handleStart = () => {
    globalServices.quizService.send('START')
  }

  return (
    <Container
      xs
      display="flex"
      direction="column"
      alignItems="center"
      css={{
        py: 32,
      }}
    >
      <Text
        h1
        css={{
          textGradient: '45deg, $yellow600 -20%, $red600 100%',
        }}
        weight="bold"
      >
        TOEFL Speaking Learner
      </Text>
      <Spacer y={2} />
      <Button color="primary" shadow size="xl" onClick={handleStart}>
        Start
      </Button>
    </Container>
  )
}
