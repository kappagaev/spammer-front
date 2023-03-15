interface Props {
  page: number
  limit: number
  total: number
  onChange: (page: number) => void
}
export const Pagination = ({ page, limit, total, onChange }: Props) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" onClick={() => onChange(1)}>
            First
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={() => onChange(page - 1)}>
            Previous
          </button>
        </li>
        {Array.from({ length: Math.ceil(total / limit) }).map((_, i) => (
          <li
            className={"page-item " + (page == i + 1 ? "active" : "")}
            key={i}
          >
            <button className="page-link" onClick={() => onChange(i + 1)}>
              {i + 1}
            </button>
          </li>
        ))}

        <li className="page-item">
          <button
            className="page-link"
            onClick={() => {
              if (page < Math.ceil(total / limit)) {
                onChange(page + 1)
              }
            }}
          >
            Next
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => onChange(Math.ceil(total / limit))}
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
  )
}
