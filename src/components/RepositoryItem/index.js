import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    issuesCount,
    avatarUrl,
    starsCount,
    forksCount,
  } = repositoryDetails

  return (
    <li className="repository-item-container">
      <img src={avatarUrl} className="avatar-img" alt={name} />
      <h1 className="title">{name}</h1>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="icon-img"
          alt="stars"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="icon-img"
          alt="forks"
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="icon-img"
          alt="open issues"
        />
        <p className="count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
