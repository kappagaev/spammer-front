import { useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { Target } from "../../types/target"

export const TargetShow = () => {
  const id = useParams<{ id: string }>().id
  const { data } = useFetch<Target>({
    url: `/api/target/${id}`,
  })
  return (
    <div>
      <h1>Target</h1>
      {data?.name}
      {data?.surname}
      {data?.patronymic}
      <a href="/targets/{{target.id}}/edit" className="btn btn-success">
        Edit
      </a>
      <form action="/targets/{{target.id}}?_method=DELETE" method="POST">
        <button type="submit" className="btn btn-danger">
          Delete
        </button>
      </form>
    </div>
  )
}
