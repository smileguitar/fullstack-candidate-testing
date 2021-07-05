import PropTypes from 'prop-types';

const Card = ({
  className,
  noPadding,
  children
}) => {
  return (
    <div className={`bg-white border-2 border-opacity-60 ${noPadding?"":"p-4"} ${className}`}>
      {children}
    </div>
  )
}

Card.propTypes = {
  className: PropTypes.string,
  noPadding: PropTypes.bool,
  children: PropTypes.node,
}

export default Card;