import {
  Button,
  Card,
  Container,
  Progress,
  Spacer,
  Text,
} from '@nextui-org/react'
import { useSelector } from '@xstate/react'
import { useContext } from 'react'
import Countdown from 'react-countdown'

import { GlobalStateContext } from '../machines/GlobalStateProvider'

const questionSelector = (state) => {
  return state.context.question
}

export default function RecordScreen() {
  const globalServices = useContext(GlobalStateContext)
  const question = useSelector(globalServices.quizService, questionSelector)

  const handleFinish = () => {
    globalServices.quizService.send('FINISH')
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
        date={Date.now() + 45000}
        intervalDelay={50}
        precision={1}
        renderer={({ seconds, milliseconds, total }) => (
          <>
            <Text size={20}>
              {44 - seconds}.{Math.floor((999 - milliseconds) / 100)} / 45.0
            </Text>
            <Progress
              value={((45000 - total) * 100) / 45000}
              color="error"
              status="error"
            />
          </>
        )}
        onComplete={() => setTimeout(handleFinish, 1000)}
      />
      <Spacer y={1} />
      {/* <Text h3>Recording...</Text> */}
      <Text h3>Start speak...</Text>
      <Spacer y={1} />
      <Button color="error" light onClick={handleQuit}>
        Quit
      </Button>
    </Container>
  )
}
