import { createTheme, NextUIProvider } from '@nextui-org/react'

import Quiz from './components/Quiz'
import { GlobalStateProvider } from './machines/GlobalStateProvider'

const darkTheme = createTheme({
  type: 'dark',
})

function App() {
  return (
    <NextUIProvider theme={darkTheme}>
      <GlobalStateProvider>
        <Quiz />
      </GlobalStateProvider>
    </NextUIProvider>
  )
}

export default App
