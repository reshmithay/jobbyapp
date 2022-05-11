import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import SkillsCard from '../SkillsCard'
import './index.css'

const JobDetailsCard = props => {
  const {jobItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
    packagePerAnnum,
    companyWebsiteUrl,
    skills,
    lifeAtCompany,
  } = jobItemDetails

  return (
    <>
      <div className="job-details-card">
        <div className="job-title-logo-rating-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
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
        <div className="description-visit-container">
          <h1 className="card-sub-heading">Description</h1>
          <a className="visit-link" href={companyWebsiteUrl}>
            <p className="visit">Visit</p>
            <FiExternalLink size="20" className="link-icon" />
          </a>
        </div>
        <p className="description">{jobDescription}</p>
        <h1 className="card-sub-heading">Skills</h1>
        <ul className="skills-list">
          {skills.map(eachSkill => (
            <SkillsCard key={eachSkill.id} skillDetails={eachSkill} />
          ))}
        </ul>
        <h1 className="life-at-company-heading">Life At Company</h1>
        <div className="life-at-company-container">
          <p className="life-at-company-description">
            {lifeAtCompany.description}
          </p>
          <img
            src={lifeAtCompany.imageUrl}
            alt="life at company"
            className="life-at-company-image"
          />
        </div>
      </div>
    </>
  )
}

export default JobDetailsCard
