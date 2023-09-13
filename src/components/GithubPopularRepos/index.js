import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    language: languageFiltersData[0].id,
    repositoryItemList: [],
    isLoading: false,
    errorOccurred: false,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    this.setState({isLoading: true})
    const {language} = this.state

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${language}`

    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const responseReposList = await response.json()
      const reposList = responseReposList.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
      }))
      this.setState({repositoryItemList: reposList, isLoading: false})
    } else {
      this.setState({
        repositoryItemList: [],
        isLoading: false,
        errorOccurred: true,
      })
    }
  }

  onSelect = id => {
    this.setState(
      {
        language: id,
        isLoading: false,
        repositoryItemList: [],
        errorOccurred: false,
      },
      this.getRepos,
    )
  }

  render() {
    const {language, repositoryItemList, isLoading, errorOccurred} = this.state
    return (
      <div className="page-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="language-filters-container">
          {languageFiltersData.map(eachFilter => (
            <LanguageFilterItem
              filterDetails={eachFilter}
              key={eachFilter.id}
              onSelect={this.onSelect}
              isSelected={eachFilter.id === language}
            />
          ))}
        </ul>
        <div className="repos-section">
          {errorOccurred && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              className="failure-img"
              alt="failure view"
            />
          )}
          {isLoading && (
            <Loader
              data-testid="loader"
              type="ThreeDots"
              color="#0284c7"
              height={80}
              width={80}
            />
          )}
          {!isLoading && (
            <ul className="repos-list-container">
              {repositoryItemList.map(eachRepo => (
                <RepositoryItem
                  key={eachRepo.id}
                  repositoryDetails={eachRepo}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
