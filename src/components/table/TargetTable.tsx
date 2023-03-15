import { useState } from "react"
import { Link } from "react-router-dom"
import { Target } from "../../types/target"

interface Props {
  targets: Target[] | undefined
}
export const TargetTable = ({ targets }: Props) => {
  const [checked, setChecked] = useState<number[]>([])
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Прізвище</th>
          <th scope="col">Ім'я</th>
          <th scope="col">По батькові</th>
          <th scope="col">Email</th>
          <th scope="col">Дії</th>
        </tr>
      </thead>

      <tbody>
        {targets?.map((target: Target) => (
          <tr key={target.id}>
            <th scope="row">{target.id}</th>
            <td>
              <Link to={`/targets/${target.id}`}>{target.surname}</Link>
            </td>
            <td>{target.name}</td>
            <td>{target.patronymic}</td>
            <td>{target.email}</td>
            <td>
              <input
                type="checkbox"
                onChange={() => {
                  if (checked.includes(target.id)) {
                    setChecked(checked.filter((id) => id !== target.id))
                  } else {
                    setChecked([...checked, target.id])
                  }
                }}
              />
            </td>
          </tr>
        ))}
        <tr>
          <td>
            <Link
              className="btn btn-primary"
              to={"/spam?targets=" + JSON.stringify(checked)}
            >
              Spam
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
