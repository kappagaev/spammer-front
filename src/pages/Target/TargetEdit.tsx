import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { apiUpdateTarget } from "../../axios/api"
import { useNotification } from "../../context/NotificationContextProvider"
import { useFetch } from "../../hooks/useFetch"
import { Target } from "../../types/target"

export const TargetEdit = () => {
  const id = useParams<{ id: string }>().id
  const { data: target } = useFetch<Target>({
    url: `/target/${id}`,
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Target>()

  const { showNotification } = useNotification()

  const navigate = useNavigate()

  const onSubmit = async (target: Target) => {
    if (!id) return
    const responce = await apiUpdateTarget(+id, target)
    if (responce.status === 200) {
      showNotification({
        title: "Success!",
        message: "Target updated successfully!",
        status: "success",
      })
      navigate("/targets/")
    }
  }
  useEffect(() => {
    console.log(errors)
  }, [errors])

  useEffect(() => {
    if (!target) return
    setValue("email", target.email)
    setValue("name", target.name)
    setValue("surname", target.surname)
    setValue("patronymic", target.patronymic)
  }, [target])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="h2">
        Edit Target #{target?.id} email: {target?.email}
      </h2>
      <div className="form-group p-10">
        <label htmlFor="targetEmail">Email address</label>
        <input
          {...register("email", {
            required: true,
          })}
          type="email"
          className="form-control"
          id="targetEmail"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <br />
      <div className="row">
        <div className="col">
          <label htmlFor="targetName">Name</label>
          <input
            {...register("name", {
              required: true,
            })}
            id="targetName"
            type="text"
            className="form-control"
            placeholder="First name"
          />
        </div>
        <div className="col">
          <label htmlFor="targetSurname">Surname</label>
          <input
            id="targetSurname"
            {...register("surname", {
              required: true,
            })}
            type="text"
            className="form-control"
            placeholder="Last name"
          />
        </div>
        <div className="col">
          <label htmlFor="targetPatronymic">Patronymic</label>
          <input
            {...register("patronymic", {
              required: true,
            })}
            type="text"
            id="targetPatronymic"
            className="form-control"
            placeholder="Last name"
          />
        </div>
      </div>
      <br />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  )
}
