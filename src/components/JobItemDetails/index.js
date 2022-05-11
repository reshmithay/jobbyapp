import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobDetailsCard from '../JobDetailsCard'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const jobItemDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobItemDetailsApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const formattedSimilarJobDetails = fetchedData.similar_jobs.map(
        eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          title: eachJob.title,
          rating: eachJob.rating,
        }),
      )
      const formattedJobDetails = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        location: fetchedData.job_details.location,
        rating: fetchedData.job_details.rating,
        title: fetchedData.job_details.title,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        skills: fetchedData.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
          id: eachSkill.name,
        })),
        lifeAtCompany: {
          description: fetchedData.job_details.life_at_company.description,
          imageUrl: fetchedData.job_details.life_at_company.image_url,
        },
      }
      this.setState({
        jobItemDetails: formattedJobDetails,
        similarJobs: formattedSimilarJobDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetryJobDetails = () => {
    this.getJobItemDetails()
  }

  renderJobDetailsSuccessView = () => {
    const {similarJobs, jobItemDetails} = this.state
    return (
      <div className="job-details-body-container">
        <JobDetailsCard
          jobItemDetails={jobItemDetails}
          getJobItemDetails={this.getJobItemDetails}
        />
        <div className="similar-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobs.map(eachJob => (
              <SimilarJobs jobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobDetailsLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsFailure = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderJobDetailsLoadingView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-main-container">
        <Header />
        {this.renderJobDetailsPage()}
      </div>
    )
  }
}

export default JobItemDetails
