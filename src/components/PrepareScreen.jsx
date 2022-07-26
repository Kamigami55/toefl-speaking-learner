import { Card, Container, Progress, Spacer, Text } from '@nextui-org/react'
import Button from '@nextui-org/react/button'
import { useSelector } from '@xstate/react'
import { useContext } from 'react'
import Countdown from 'react-countdown'

import { GlobalStateContext } from '../machines/GlobalStateProvider'

const questionSelector = (state) => {
  return state.context.question
}

export default function PrepareScreen() {
  const globalServices = useContext(GlobalStateContext)
  const question = useSelector(globalServices.quizService, questionSelector)

  const handleStartRecording = () => {
    globalServices.quizService.send('RECORD')
  }
  const handleQuit = () => {
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
      <Countdown
        date={Date.now() + 15000}
        intervalDelay={50}
        precision={1}
        renderer={({ seconds, milliseconds, total }) => (
          <>
            <Text size={20}>
              {14 - seconds}.{Math.floor((999 - milliseconds) / 100)} / 15.0
            </Text>
            <Progress
              value={((15000 - total) * 100) / 15000}
              color="success"
              status="success"
            />
          </>
        )}
        onComplete={() => {
          setTimeout(handleStartRecording, 1000)
        }}
      />

      <Spacer y={2} />
      <Button color="success" shadow size="lg" onClick={handleStartRecording}>
        Start Recording
      </Button>
      <Spacer y={1} />
      <Button color="error" light onClick={handleQuit}>
        Quit
      </Button>
    </Container>
  )
}
