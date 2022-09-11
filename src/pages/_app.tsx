import type { AppProps } from 'next/app'
import { Layout } from '@/compo/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/css/global.scss'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}

export default App
