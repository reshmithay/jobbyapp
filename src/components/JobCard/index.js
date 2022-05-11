import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
    id,
    packagePerAnnum,
  } = jobDetails
  return (
    <li className="job-card-container">
      <Link to={`/jobs/${id}`} className="job-link">
        <div className="job-title-logo-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="job-title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar fill="#fbbf24" size="20" className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package-container">
          <div className="location-employment">
            <div className="location-container">
              <MdLocationOn size="20" fill="#ffffff" />
              <p className="location">{location}</p>
            </div>
            <div className="employment-type-container">
              <BsBriefcaseFill size="20" fill="#ffffff" />
              <p className="employment">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
