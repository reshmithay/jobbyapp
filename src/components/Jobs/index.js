import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import ProfileCard from '../ProfileCard'
import Filters from '../Filters'
import JobCardsView from '../JobCardsView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileDetails: [],
    jobsList: [],
    employmentType: [],
    salaryRange: 0,
    searchInput: '',
    apiStatusJobs: apiStatusConstants.initial,
    apiStatusProfile: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsList()
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatusProfile: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const formattedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileDetails: formattedData,
        apiStatusProfile: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatusProfile: apiStatusConstants.failure})
    }
  }

  getJobsList = async () => {
    this.setState({apiStatusJobs: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const {employmentType, salaryRange, searchInput} = this.state
    const employmentTypeString = employmentType.join()
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const formattedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: formattedData,
        apiStatusJobs: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatusJobs: apiStatusConstants.failure})
    }
  }

  onRetryProfile = () => {
    this.getProfileDetails()
  }

  onRetryJobs = () => {
    this.getJobsList()
  }

  changeEmploymentType = type => {
    const {employmentType} = this.state
    let updatedEmploymentType = [...employmentType, type]
    if (employmentType.includes(type)) {
      updatedEmploymentType = employmentType.filter(each => each !== type)
    }
    this.setState({employmentType: updatedEmploymentType}, this.getJobsList)
  }

  changeSalaryRange = range => {
    this.setState({salaryRange: range}, this.getJobsList)
  }

  onChangeSearchInput = event =>
    this.setState({searchInput: event.target.value})

  onClickSearch = () => {
    this.getJobsList()
  }

  render() {
    const {
      apiStatusProfile,
      profileDetails,
      searchInput,
      apiStatusJobs,
      jobsList,
    } = this.state

    return (
      <div>
        <Header />
        <div className="jobs-body-container">
          <div className="profile-filters-container">
            <div className="search-container-sm">
              <input
                type="search"
                className="search-input-sm"
                value={searchInput}
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                testid="searchButton"
                className="search-button-sm"
                onClick={this.onClickSearch}
              >
                <BsSearch fill="#ffffff" size="15" className="search-icon" />
              </button>
            </div>
            <ProfileCard
              apiStatusProfile={apiStatusProfile}
              profileDetails={profileDetails}
              onRetryProfile={this.onRetryProfile}
            />
            <Filters
              changeEmploymentType={this.changeEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
            />
          </div>
          <div className="jobs-cards-container">
            <div className="search-container-lg">
              <input
                type="search"
                className="search-input"
                value={searchInput}
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                testid="searchButton"
                className="search-button"
                onClick={this.onClickSearch}
              >
                <BsSearch fill="#ffffff" size="15" className="search-icon" />
              </button>
            </div>
            <JobCardsView
              apiStatusJobs={apiStatusJobs}
              jobsList={jobsList}
              apiStatusConstants={apiStatusConstants}
              onRetryJobs={this.onRetryJobs}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
