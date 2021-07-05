import PropTypes from 'prop-types'

const PrimaryButton = ({
  variant="contained",
  children
}) => {
  return (
    <button className={`${variant==='contained'?'bg-primary-blue text-white py-2':'bg-white text-primary-blue border-2 border-primary-blue py-2'} px-4 rounded-lg font-semibold`}>
      {children}
    </button>
  )
}

PrimaryButton.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node
}

export default PrimaryButton;