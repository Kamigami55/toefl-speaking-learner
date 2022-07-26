import { useActor } from '@xstate/react'
import { useContext } from 'react'

import { GlobalStateContext } from '../machines/GlobalStateProvider'
import FinishScreen from './FinishScreen'
import HomeScreen from './HomeScreen'
import PrepareScreen from './PrepareScreen'
import RecordScreen from './RecordScreen'

export default function Quiz() {
  const globalServices = useContext(GlobalStateContext)
  const [state] = useActor(globalServices.quizService)

  if (state.matches('home')) {
    return <HomeScreen />
  } else if (state.matches('prepare')) {
    return <PrepareScreen />
  } else if (state.matches('record')) {
    return <RecordScreen />
  } else if (state.matches('finish')) {
    return <FinishScreen />
  } else {
    return 'ERROR, please reload'
  }
}
