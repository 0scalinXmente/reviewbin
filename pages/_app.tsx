import { BaseStyles } from '@primer/components'
import type { AppProps } from 'next/app'
import 'codemirror/theme/solarized.css'
import '../src/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => (
  <BaseStyles>
    <Component {...pageProps} />
  </BaseStyles>
)

export default App
