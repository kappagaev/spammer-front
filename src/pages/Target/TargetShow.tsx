import { Link, useNavigate, useParams } from "react-router-dom"
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
      <div className="form-group p-10">id: {data?.id}</div>
      <div className="form-group p-10">id: {data?.email}</div>
      <div className="form-group p-10">name: {data?.name}</div>
      <div className="form-group p-10">surname: {data?.surname}</div>
      <div className="form-group p-10">patronymic: {data?.patronymic}</div>

      <br />
      <Link className="btn btn-success" to={`/targets/${id}/edit`}>
        Edit
      </Link>
      <button type="submit" className="btn btn-danger" onClick={onDelete}>
        Delete
      </button>
    </div>
  )
}
