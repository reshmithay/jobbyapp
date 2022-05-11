import Loader from 'react-loader-spinner'
import JobCard from '../JobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const JobCardsView = props => {
  const {apiStatusJobs, jobsList, onRetryJobs} = props
  const displayJobs = jobsList.length > 0

  const onClickRetryJobs = () => {
    onRetryJobs()
  }

  const renderNoJobsView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  const renderJobsSuccessView = () =>
    displayJobs ? (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    ) : (
      renderNoJobsView()
    )

  const renderJobsFailureView = () => (
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
      <button type="button" className="retry-button" onClick={onClickRetryJobs}>
        Retry
      </button>
    </div>
  )

  const renderJobsLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  switch (apiStatusJobs) {
    case apiStatusConstants.success:
      return renderJobsSuccessView()
    case apiStatusConstants.failure:
      return renderJobsFailureView()
    case apiStatusConstants.inProgress:
      return renderJobsLoadingView()
    default:
      return null
  }
}
export default JobCardsView
