import { createTheme, NextUIProvider } from '@nextui-org/react'
import Button from '@nextui-org/react/button'

const darkTheme = createTheme({
  type: 'dark',
})

function App() {
  return (
    <NextUIProvider theme={darkTheme}>
      <Button>Click me</Button>
    </NextUIProvider>
  )
}

export default App
