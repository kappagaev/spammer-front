import { Link } from "react-router-dom"
import { Target } from "../../types/target"

interface Props {
  targets: Target[] | undefined
}
export const TargetTable = ({ targets }: Props) => {
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
              <input type="checkbox" name="target_id[]" value="{{this.id}}" />
            </td>
          </tr>
        ))}
        <tr>
          <td>
            <button type="submit" className="btn btn-info">
              Spam
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
