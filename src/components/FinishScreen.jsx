import { Button, Card, Container, Spacer, Text } from '@nextui-org/react'
import { useSelector } from '@xstate/react'
import { useContext } from 'react'

import { GlobalStateContext } from '../machines/GlobalStateProvider'

const questionSelector = (state) => {
  return state.context.question
}

export default function FinishScreen() {
  const globalServices = useContext(GlobalStateContext)
  const question = useSelector(globalServices.quizService, questionSelector)

  const handleRedoQuiz = () => {
    globalServices.quizService.send('REDO')
  }
  const handleReturnHome = () => {
    globalServices.quizService.send('QUIT')
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
      <Card>
        <Card.Body>
          <Text
            h2
            css={{
              letterSpacing: '0.1px',
              textAlign: 'center',
            }}
          >
            {question}
          </Text>
        </Card.Body>
      </Card>
      <Spacer y={2} />
      <Text h3 color="success">
        Recording saved!
      </Text>
      <Spacer y={2} />
      <Button color="success" size="lg">
        Play Your Recording
      </Button>
      <Spacer y={1} />
      <Button color="error" onClick={handleRedoQuiz}>
        Redo This Quiz
      </Button>
      <Spacer y={1} />
      <Button color="secondary" onClick={handleReturnHome}>
        Return to Home
      </Button>
    </Container>
  )
}
