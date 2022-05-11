import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const Filters = props => {
  const {changeSalaryRange, changeEmploymentType} = props

  const onChangeEmploymentType = event => {
    changeEmploymentType(event.target.value)
  }

  const onChangeSalaryRange = event => {
    console.log(event.target.value)
    changeSalaryRange(event.target.id)
  }

  return (
    <>
      <hr className="line" />
      <h1 className="filters-heading">Type of Employment</h1>
      <ul className="filters-list">
        {employmentTypesList.map(eachType => (
          <li className="list-item" key={eachType.employmentTypeId}>
            <input
              type="checkbox"
              name="employment types"
              id={eachType.employmentTypeId}
              value={eachType.employmentTypeId}
              className="filter-box"
              onChange={onChangeEmploymentType}
            />
            <label htmlFor={eachType.employmentTypeId} className="label">
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="line" />
      <h1 className="filters-heading">Salary Range</h1>
      <ul className="filters-list">
        {salaryRangesList.map(eachRange => (
          <li className="list-item" key={eachRange.salaryRangeId}>
            <input
              type="radio"
              name="salary range"
              id={eachRange.salaryRangeId}
              value={eachRange.salaryRangeId}
              onChange={onChangeSalaryRange}
              className="filter-box"
            />
            <label htmlFor={eachRange.salaryRangeId} className="label">
              {eachRange.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Filters
