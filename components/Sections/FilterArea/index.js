import Card from 'components/Card'
import { DataContext } from 'Contexts/DataContext'
import PropTypes from 'prop-types'
import React from 'react'
import { numberWithCommas } from 'utils/helper'
import FilterModal from '../FilterModal'

const FilterArea = ({
  title,
  filterKey
}) => {

  const [showModal, setShowModal] = React.useState(false);
  const {allFilters, selectedFilters, updateSelectedFilters} = React.useContext(DataContext);

  return (
    <Card className="w-80">
      <p className="font-bold mb-2">{title}</p>
      {allFilters && allFilters[filterKey]?.slice(0, 10)?.map(item =>
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
      {allFilters && allFilters[filterKey]?.length > 10 &&
        <p onClick={()=>setShowModal(true)} className="text-blue-700 hover:underline cursor-pointer">Show more</p>
      }
      {showModal &&
        <FilterModal
          title={title}
          filterKey={filterKey}
          onClose={()=>setShowModal(false)}
        />
      }
    </Card>
  )
}

FilterArea.propTypes = {
  title: PropTypes.string,
  filterKey: PropTypes.string
}

export default FilterArea;