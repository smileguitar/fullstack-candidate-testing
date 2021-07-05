import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import Head from 'next/head'
import 'tailwindcss/tailwind.css'

dayjs.extend(relativeTime)

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>HEALTH EXPLORE</title>
      <meta name="description" content="Find jobs in medical field."></meta>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Component {...pageProps} />
  </>
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
}

export default MyApp
