import { Card, Container, Progress, Spacer, Text } from '@nextui-org/react'
import Button from '@nextui-org/react/button'
import { useSelector } from '@xstate/react'
import { useContext, useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { useSpeechSynthesis } from 'react-speech-kit'

import { GlobalStateContext } from '../machines/GlobalStateProvider'

const questionSelector = (state) => {
  return state.context.question
}

const getVoice = (voices) => {
  if (voices.length === 0) {
    return null
  }
  let preferredVoice = voices.find(
    (voice) =>
      voice.voiceURI ===
      'Microsoft Jenny Online (Natural) - English (United States)'
  )
  if (preferredVoice) {
    return preferredVoice
  }
  preferredVoice = voices.find(
    (voice) => voice.voiceURI === 'Google US English'
  )
  if (preferredVoice) {
    return preferredVoice
  }
  preferredVoice = voices.find(
    (voice) => voice.voiceURI === 'Google UK English'
  )
  if (preferredVoice) {
    return preferredVoice
  }
  preferredVoice = voices.find((voice) => voice.lang === 'en-US')
  if (preferredVoice) {
    return preferredVoice
  }
  return voices[0]
}

export default function PrepareScreen() {
  const globalServices = useContext(GlobalStateContext)
  const question = useSelector(globalServices.quizService, questionSelector)

  const [shouldStartCountdown, setStartCountdown] = useState(false)
  const handleSpeakEnd = () => {
    setStartCountdown(true)
  }

  const { speak, voices, speaking, cancel } = useSpeechSynthesis({
    onEnd: handleSpeakEnd,
  })

  useEffect(() => {
    if (!speaking && !shouldStartCountdown && voices && voices.length > 0) {
      speak({
        text: question.split('.').slice(1).join('.'),
        voice: getVoice(voices),
      })
    }
    return () => {
      if (speaking) {
        cancel()
      }
    }
  }, [voices, speaking, cancel, question, shouldStartCountdown])

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
      {shouldStartCountdown && (
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
      )}

      <Spacer y={2} />
      <Button color="success" shadow size="lg" onClick={handleStartRecording}>
        Start!
      </Button>
      <Spacer y={1} />
      <Button color="error" light onClick={handleQuit}>
        Quit
      </Button>
    </Container>
  )
}
