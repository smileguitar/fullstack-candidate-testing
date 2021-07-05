import Link from 'next/link'
import PropTypes from 'prop-types'
import PrimaryButton from 'components/PrimaryButton'

const Layout = ({
  children
}) => {
  return (
    <div className="min-h-screen flex flex-col text-primary subpixel-antialiased">
      <header className="bg-white">
        <div className="flex items-center max-w-layout-max m-auto py-4 px-8">
          <div className="flex-1 flex items-center gap-3">
            <div className="block xl:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <p className="text-primary-blue text-xl font-bold">HEALTH EXPLORE</p>
          </div>
          <div className="gap-6 2xl:gap-12 hidden xl:flex">
            <Link href="#"><p className="font-bold">PROFILE</p></Link>
            <Link href="#"><p className="font-bold">JOBS</p></Link>
            <Link href="#"><p className="font-bold">PROFESSIONAL NETWORK</p></Link>
            <Link href="#"><p className="font-bold">LAUNGE</p></Link>
            <Link href="#"><p className="font-bold">SALERY</p></Link>
          </div>
          <div className="flex flex-1 justify-end gap-4 xl:gap-8">
            <div className="hidden xl:block">
              <PrimaryButton variant="outlined">CREATE JOB</PrimaryButton>
            </div>
            <div className="bg-primary-blue rounded-full w-10 h-10 flex items-center justify-center relative">
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex justify-center items-center border-4 border-white">
                <p className="text-xs text-white">2</p>
              </div>
              <p className="text-white text-lg font-bold">JO</p>
            </div>
            <button className="font-bold hidden xl:block">LOGOUT</button>
          </div>
        </div>
      </header>
      <div className="bg-gray-100 flex-1 pb-8">
        {children}
      </div>
      <footer className="bg-white">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-2 max-w-layout-max m-auto px-6 pt-10 pb-14">
          <div className="w-full lg:w-1/2">
            <p className="text-2xl font-bold mb-3">About us</p>
            <p className="text mb-2">We are a team of nurses, doctors, technologists and executives dedicated to help nurses find jobs that they love.</p>
            <p className="text mb-2">All copyrights reserved &copy; 2020 - Health Explore</p>
          </div>
          <div className="w-full lg:w-1/4">
            <p className="text-2xl font-bold mb-3">Sitemap</p>
            <p className="text mb-2">Nurses</p>
            <p className="text mb-2">Employers</p>
            <p className="text mb-2">Social networking</p>
            <p className="text mb-2">Jobs</p>
          </div>
          <div className="w-full lg:w-1/4">
            <p className="text-2xl font-bold mb-3">Privacy</p>
            <p className="text mb-2">Terms of use</p>
            <p className="text mb-2">Privacy policy</p>
            <p className="text mb-2">Cookie policy</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout;