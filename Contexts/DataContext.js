import React from 'react'
import PropTypes from 'prop-types'
import { SERVER_ENDPOINT } from 'utils/const'
import cloneDeep from 'lodash.clonedeep'

export const DataContext = React.createContext(null)

const DataContextProvider = ({
  children
}) => {

  const [controller, setController] = React.useState(null)
  const [searchText, setSearchText] = React.useState("")
  const [allFilters, setAllFilters] = React.useState(null)
  const [selectedFilters, setSelectedFilters] = React.useState({
    job_type: [],
    department: [],
    work_schedule: [],
    experience: []
  })
  const [data, setData] = React.useState({
    isLoading: 0,
    data: null,
    sortedData: [],
    error: null
  })
  const [sortOption, setSortOption] = React.useState({
    department: "none",
    location: "none",
    role: "none",
    education: "none",
    experience: "none",
  })

  const compareElements = (el1, el2, order) => {
    let compare = 0
    if (order==="asc") {
      compare = el1.localeCompare(el2)
    }
    else if (order==="des") {
      compare = el2.localeCompare(el1)
    }
    return compare
  }

  const sortData = React.useCallback((data) => {
    if (sortOption && data) {
      let isSortSelected = false
      for (const option in sortOption) {
        if(sortOption[option] !== "none") {
          isSortSelected = true
        }
      }
      if (!isSortSelected) {
        return data
      }
      return data.map(hospital => ({
        ...hospital,
        items: hospital.items.sort((el1, el2) => {
          const departmentCompare = compareElements(el1.department[0], el2.department[0], sortOption.department);
          if(departmentCompare===0) {
            const locationCompare = compareElements(el1.location, el2.location, sortOption.location);
            if(locationCompare===0) {
              const roleCompare = compareElements(el1.type, el2.type, sortOption.role);
              if(roleCompare===0) {
                const educationCompare = compareElements(el1.required_credentials[0], el2.required_credentials[0], sortOption.education);
                if(educationCompare===0) {
                  const experienceCompare = compareElements(el1.experience, el2.experience, sortOption.experience);
                  return experienceCompare
                }
                else {
                  return educationCompare
                }
              }
              else {
                return roleCompare
              }
            }
            else {
              return locationCompare
            }
          }
          else {
            return departmentCompare
          }
        })
      }))
    }
    return data
  }, [sortOption])

  const fetchFilters = async () => {
    fetch(`${SERVER_ENDPOINT}/filters`)
    .then (async res => {
      const filtersData = await res.json()
      setAllFilters(filtersData)
    })
    .catch(() => {
      setAllFilters(null)
    })
      
  }

  React.useEffect(() => {
    fetchFilters()
    fetchData()
  }, [])

  React.useEffect(() => {
    fetchData()
  }, [selectedFilters])

  React.useEffect(() => {
    setData(pre => ({
      ...pre,
      sortedData: sortData(cloneDeep(pre.data))
    }))
  }, [sortOption])

  const fetchData = React.useCallback(() => {
    setData(pre => ({
      ...pre,
      isLoading: pre.isLoading + 1,
    }))
    controller?.abort()
    const newController = new AbortController();
    setController(newController)
    fetch(`${SERVER_ENDPOINT}/jobs`, {
      method: 'POST',
      signal: newController.signal,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        search: searchText,
        filters: selectedFilters
      })
    })
    .then(async res => {
      const jobsData = await res.json()
      setData(pre => ({
        isLoading: pre.isLoading - 1,
        data: jobsData.jobs,
        sortedData: sortData(cloneDeep(jobsData.jobs)),
        error: null
      }))
    })
    .catch(() => {
      setData(pre => ({
        isLoading: pre.isLoading - 1,
        data: null,
        sortedData: [],
        error: "Network Issue!"
      }))
    })
  }, [controller, searchText, setController, setData, sortData])

  const updateSearchText = React.useCallback((text) => {
    setSearchText(text);
  }, [setSearchText])

  const updateSelectedFilters = React.useCallback((key, filter) => {
    setSelectedFilters(pre => {
      const newState = {...pre}
      const itemIndex = newState[key].indexOf(filter)
      if (itemIndex >= 0) {
        newState[key].splice(itemIndex, 1)
      }
      else {
        newState[key].push(filter)
      }
      return newState
    });
  }, [setSelectedFilters])

  const updateSortOrder = React.useCallback((sortKey) => {
    setSortOption(pre => {
      const newState = {...pre}
      if(newState[sortKey]==="none") {
        newState[sortKey]="asc"
      }
      else if(newState[sortKey]==="asc") {
        newState[sortKey]="des"
      }
      else if(newState[sortKey]==="des") {
        newState[sortKey]="none"
      }
      return newState
    })
  }, [sortOption, setSortOption])

  return (
    <DataContext.Provider value={{allFilters, selectedFilters, searchText, data, sortOption, fetchData, updateSearchText, updateSelectedFilters, updateSortOrder}}>
      {children}
    </DataContext.Provider>
  )
}

DataContextProvider.propTypes = {
  children: PropTypes.node
}

export default DataContextProvider