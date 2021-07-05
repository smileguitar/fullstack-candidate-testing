import httpMocks from "node-mocks-http"
import jobs from '../pages/api/jobs'

describe('/api/jobs Handler', () => {
  test('testing whether the API is running or not.', async () => {
    // expect.assertions(1)
    var req  = httpMocks.createRequest({
      method: 'GET',
      url: '/user/jobs',
      body: {
        search: "",
        filters: {
          job_type: [],
          department: [],
          work_schedule: [],
          experience: []
        }
      }
    });

    var res = httpMocks.createResponse();
    await jobs(req, res)
    
    expect(res._getStatusCode()).toBe(200)
  });

  test('testing search', async () => {
    // expect.assertions(1)
    var req  = httpMocks.createRequest({
      method: 'GET',
      url: '/user/jobs',
      body: {
        search: "Infusion Therapy Nurse",
        filters: {
          job_type: [],
          department: [],
          work_schedule: [],
          experience: []
        }
      }
    });

    var res = httpMocks.createResponse();
    await jobs(req, res)

    const retuenData = JSON.parse(res._getData())
    
    expect(retuenData.jobs[0].items[0].job_title).toBe("Infusion Therapy Nurse")
    expect(res._getStatusCode()).toBe(200)
  });
});