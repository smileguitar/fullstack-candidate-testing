import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import PrimaryButton from 'components/PrimaryButton'

const JobDetail = ({
  jobData
}) => {
  const [showMoreDetails, setShowMoreDetails] = React.useState(false);

  return (
    <>
      <div onClick={()=>setShowMoreDetails(pre=>!pre)} className="flex items-center justify-between flex-wrap border-t-2 border-gray-100 p-3 hover:bg-gray-200 cursor-pointer">
        <div>
          <p className="font-bold">{jobData.job_title}</p>
          <p className="text-sm">{jobData.job_type} | ${jobData.salary_range[0]} - ${jobData.salary_range[1]} an hour | {jobData.city}</p>
        </div>
        <p>{dayjs(jobData.created).fromNow()}</p>
      </div>
      {showMoreDetails &&
        <div className="flex flex-col lg:flex-row px-3 pb-4">
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row items-start mb-4">
              <p className="font-bold w-1/3">Department:</p>
              <p className="w-2/3">{jobData.department.join(", ")}</p>
            </div>
            <div className="flex flex-col lg:flex-row items-start mb-4">
              <p className="font-bold w-1/3">Hours / shifts:</p>
              <p className="w-2/3">{jobData.hours} hours / {jobData.work_schedule}</p>
            </div>
            <div className="flex flex-col lg:flex-row items-start mb-4">
              <p className="font-bold w-1/3">Summary:</p>
              <p className="w-2/3">{jobData.description}</p>
            </div>
          </div>
          <div className="flex flex-row lg:flex-col justify-start lg:justify-center items-end gap-2">
            <PrimaryButton>
              Job details
            </PrimaryButton>
            <PrimaryButton variant="outlined">
              Save job
            </PrimaryButton>
          </div>
        </div>
      }
    </>
  )
}

JobDetail.propTypes = {
  jobData: PropTypes.object
}

export default JobDetail;