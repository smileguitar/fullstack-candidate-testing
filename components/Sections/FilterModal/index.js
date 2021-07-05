import { DataContext } from 'Contexts/DataContext'
import PropTypes from 'prop-types'
import React from 'react'
import Card from 'components/Card'
import { numberWithCommas } from 'utils/helper'


const FilterModal = ({
  title,
  filterKey,
  onClose
}) => {

  const {allFilters, selectedFilters, updateSelectedFilters} = React.useContext(DataContext);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <Card noPadding className="w-modal-width mx-8 rounded-lg">
        <div className="border-b-2 border-gray-300 flex items-center justify-between p-4">
          <p className="font-bold text-xl">{title}</p>
          <div onClick={onClose} className="cursor-pointer hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <div className="p-4 grid grid-cols-4 gap-2">
          {allFilters[filterKey]?.map(item =>
            <div
              key={item.key}
              className="flex gap-2 items-end mb-2 cursor-pointer"
              onClick={() => {
                updateSelectedFilters(filterKey, item.key)
              }}
            >
              <p className={selectedFilters[filterKey].includes(item.key)?'font-bold':''}>
                {item.key}<span className="text-disabled text-sm ml-2">{numberWithCommas(item.doc_count)}</span>
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

FilterModal.propTypes = {
  title: PropTypes.string,
  filterKey: PropTypes.string,
  onClose: PropTypes.func,
}

export default FilterModal;