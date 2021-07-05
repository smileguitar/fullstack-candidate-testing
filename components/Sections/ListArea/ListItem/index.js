import React from 'react'
import PropTypes from 'prop-types'
import JobDetail from './JobDetail'

const ListArea = ({
  hospitalData
}) => {
  const [showJobs, setShowJobs] = React.useState(false);

  return (
    <>
      <div onClick={()=>setShowJobs(pre=>!pre)} className="w-full p-3 flex items-center gap-4 hover:bg-gray-200 cursor-pointer">
        <div className="w-10 h-10 bg-gray-400 bg-opacity-70 flex items-center justify-center rounded-lg">
          <p className="font text-white p-2 text-2xl">
            {hospitalData.name.substring(0, 2).toUpperCase()}
          </p>
        </div>
        <p>{hospitalData.total_jobs_in_hospital} jobs for {hospitalData.name}</p>
      </div>
      {showJobs && hospitalData && hospitalData.items.map(job =>
        <JobDetail key={job.job_id} jobData={job} />
      )}
    </>
  )
}

ListArea.propTypes = {
  hospitalData: PropTypes.object
}

export default ListArea;