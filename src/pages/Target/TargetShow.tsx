import { useNavigate, useParams } from "react-router-dom"
import { apiDeleteTarget } from "../../axios/api"
import { useNotification } from "../../context/NotificationContextProvider"
import { useFetch } from "../../hooks/useFetch"
import { Target } from "../../types/target"

export const TargetShow = () => {
  const id = useParams<{ id: string }>().id
  const { data } = useFetch<Target>({
    url: `/target/${id}`,
  })

  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const onDelete = async () => {
    if (!confirm("Are you sure?")) {
      return
    }
    if (!id) {
      navigate("/targets/")
      return
    }

    const responce = await apiDeleteTarget(+id)
    if (responce.status === 204) {
      showNotification({
        title: "Success",
        message: "Target was deleted",
        status: "success",
      })
      navigate("/targets")
    }
  }
  return (
    <div>
      <h1>Target</h1>
      {data?.name}
      {data?.surname}
      {data?.patronymic}
      <a href="/targets/{{target.id}}/edit" className="btn btn-success">
        Edit
      </a>
      <button type="submit" className="btn btn-danger" onClick={onDelete}>
        Delete
      </button>
    </div>
  )
}
