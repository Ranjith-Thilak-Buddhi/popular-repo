import './index.css'

const LanguageFilterItem = props => {
  const {filterDetails, onSelect, isSelected} = props
  const {id, language} = filterDetails
  const changeSelection = () => {
    onSelect(id)
  }
  const selected = isSelected ? 'selected' : ''

  return (
    <li className="language-filter-container">
      <button
        type="button"
        className={`button ${selected}`}
        onClick={changeSelection}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
