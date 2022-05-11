import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProfileCard = props => {
  const {profileDetails, apiStatusProfile, onRetryProfile} = props
  const {name, profileImageUrl, shortBio} = profileDetails

  const onClickRetryProfile = () => {
    onRetryProfile()
  }

  const renderProfileView = () => (
    <div className="profile-container">
      <img src={profileImageUrl} alt="profile" className="profile-pic" />
      <h1 className="profile-name">{name}</h1>
      <p className="profile-bio">{shortBio}</p>
    </div>
  )

  const renderProfileLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        className="retry-button"
        onClick={onClickRetryProfile}
      >
        Retry
      </button>
    </div>
  )

  switch (apiStatusProfile) {
    case apiStatusConstants.success:
      return renderProfileView()
    case apiStatusConstants.failure:
      return renderProfileFailureView()
    case apiStatusConstants.inProgress:
      return renderProfileLoadingView()
    default:
      return null
  }
}

export default ProfileCard
