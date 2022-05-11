import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-item">
      <div className="similar-logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-company-logo"
        />
        <div>
          <div className="similar-job-title-rating-container">
            <h1 className="similar-job-title">{title}</h1>
            <div className="similar-rating-container">
              <AiFillStar className="star-icon" size="16" color="#fbbf24" />
              <p className="similar-rating">{rating}</p>
            </div>
          </div>
        </div>
      </div>
      <h1 className="similar-description-heading">Description</h1>
      <p className="similar-description">{jobDescription}</p>
      <div className="location-employment-container">
        <div className="location-container">
          <MdLocationOn className="location-logo" size="20" color="#ffffff" />
          <p className="location-employment-label">{location}</p>
        </div>
        <div className="employment-container">
          <BsBriefcaseFill className="logo" size="20" color="#ffffff" />
          <p className="location-employment-label">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
