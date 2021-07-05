import Layout from "components/Layout"
import FilterArea from "components/Sections/FilterArea"
import Search from "components/Sections/Search"
import ListArea from "components/Sections/ListArea"
import DataContextProvider from 'Contexts/DataContext';

const Index = () => {
  return (
    <DataContextProvider>
      <Layout>
        <div className="max-w-layout-max m-auto p-0 md:p-4 flex flex-col gap-0 md:gap-4">
          <Search />
          <div className="flex flex-row gap-4 items-start">
            <div className="hidden md:flex flex-col gap-4">
              <FilterArea title="JOB TYPE" filterKey="job_type"/>
              <FilterArea title="DEPARTMENT" filterKey="department"/>
              <FilterArea title="WORK SCHEDULE" filterKey="work_schedule"/>
              <FilterArea title="EXPERIENCE" filterKey="experience"/>
            </div>
            <ListArea />
          </div>
        </div>
      </Layout>
    </DataContextProvider>
  )
}

export default Index
