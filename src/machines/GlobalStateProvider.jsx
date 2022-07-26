import { useInterpret } from '@xstate/react'
import React, { createContext } from 'react'

import { quizMachine } from './quizMachine'

export const GlobalStateContext = createContext({})

export const GlobalStateProvider = (props) => {
  const quizService = useInterpret(quizMachine)

  return (
    <GlobalStateContext.Provider value={{ quizService }}>
      {props.children}
    </GlobalStateContext.Provider>
  )
}
