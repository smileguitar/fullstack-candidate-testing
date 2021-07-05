import React from 'react'
import Card from 'components/Card'
import Spinner from 'components/Spinner'
import { numberWithCommas } from 'utils/helper'
import ListItem from './ListItem'
import { DataContext } from 'Contexts/DataContext'

const sortableItems = [
  {
    label: "Location",
    key: "location"
  },
  {
    label: "Role",
    key: "role"
  },
  {
    label: "Department",
    key: "department"
  },
  {
    label: "Education",
    key: "education"
  },
  {
    label: "Experience",
    key: "experience"
  },
]

const ListArea = () => {

  const {data, sortOption, updateSortOrder} = React.useContext(DataContext)

  return (
    <Card className="w-full">
      <div className="pt-6 pb-12 px-2 flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm"><span className="font-bold text-base">{numberWithCommas(7753)}</span> job postings</p>
        <div className="hidden md:flex gap-y-1 gap-x-1 flex-wrap">
          <p className="text-disabled text-sm mr-5">Sort by</p>
          {sortableItems.map(sortItem =>
            <div key={sortItem.key} className="flex items-center cursor-pointer">
              <p onClick={()=>updateSortOrder(sortItem.key)} className={`${sortOption[sortItem.key]!=="none"?"font-bold":""} text-sm`}>{sortItem.label}</p>
              <div className="w-5">
                {
                  sortOption[sortItem.key]==="asc" &&
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                }
                {
                  sortOption[sortItem.key]==="des" &&
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                }
              </div>
            </div>
          )}
        </div>
      </div>
      {data.isLoading &&
        <div className="w-full h-32 flex items-center justify-center">
          <Spinner />
        </div>
      }
      {!data.isLoading && data?.sortedData?.map((hospital, index) =>
        <div key={`${index}-${hospital.name}`}>
          <ListItem hospitalData={hospital}/>
        </div>
      )}
      {!data.isLoading && data?.sortedData.length===0 &&
        <p className="text-center my-12">No result found!</p>
      }
    </Card>
  )
}

export default ListArea;