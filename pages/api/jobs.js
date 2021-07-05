// @ts-ignore
import jobs from '../../data/jobs'

const hasFilter = (job, filters) => {
  if (
    (filters.job_type.length===0 || filters.job_type.includes(job.job_type)) &&
    (filters.department.length===0 || filters.department.find(dep => job.department.includes(dep))) &&
    (filters.work_schedule.length===0 || filters.work_schedule.includes(job.work_schedule)) &&
    (filters.experience.length===0 || filters.experience.includes(job.experience))
  ) {
    return true
  }
  return false
}

const hasSearchText = (job, search) => {
  if (job && search && search !== '' && (
    job.job_title.toLowerCase().includes(search) ||
    job.name.toLowerCase().includes(search) ||
    job.type.toLowerCase().includes(search) ||
    job.required_skills.indexOf(skill=>skill.toLowerCase().includes(search)) >= 0
  )) {
    return true
  }
  return false
}

export default async (req, res) => {
  
  const search = req.body.search.toLowerCase()
  const filters = req.body.filters

  let returnData = jobs.map((hospital) => {
    let newItems = []

    // If hospital name is searched then no need to search individual jobs
    // for search text. The filter are still applied on individual jobs.
    if (hospital.name.toLowerCase().includes(search)) {
      newItems = hospital.items.filter(job => {
        if(hasFilter(job, filters)) {
          return true
        }
        return false
      })
    }
    // If hospital name does not contains searched text then jobs are filtered
    // using both filters and search text.
    else {
      newItems = hospital.items.filter(job => {
        if(hasFilter(job, filters) && hasSearchText(job, search)) {
          return true
        }
        return false
      })
    }
    return {...hospital, total_jobs_in_hospital: newItems.length, items: newItems}
  })

  // removing hospitals which contains no jobs after processing
  returnData = returnData.filter(hospital => hospital.items.length>0)

  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()))

  res.statusCode = 200
  res.json({jobs: returnData})
}
