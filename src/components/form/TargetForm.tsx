import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { apiCreateTarget } from "../../axios/api"
import { useNotification } from "../../context/NotificationContextProvider"
import { Target } from "../../types/target"

interface TargetFormProps {
  target?: Target
  onSubmit: (target: Target) => void
}

export const TargetForm = ({ target }: TargetFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Target>()

  const { showNotification } = useNotification()

  const navigate = useNavigate()
  const onSubmit = async (target: Target) => {
    const responce = await apiCreateTarget(target)
    if (responce.status === 201) {
      console.log("success")

      showNotification({
        title: "Success!",
        message: "Target created successfully!",
        status: "success",
      })
      navigate("/targets/")
    }
  }
  useEffect(() => {
    console.log(errors)
  }, [errors])
  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
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
          value={target?.email}
        />
      </div>
      <br />
      <div className="row">
        <div className="col">
          <input
            {...register("name", {
              required: true,
            })}
            type="text"
            className="form-control"
            placeholder="First name"
            value={target?.name}
          />
        </div>
        <div className="col">
          <input
            {...register("surname", {
              required: true,
            })}
            type="text"
            className="form-control"
            placeholder="Last name"
            value={target?.surname}
          />
        </div>
        <div className="col">
          <input
            {...register("patronymic", {
              required: true,
            })}
            type="text"
            className="form-control"
            placeholder="Last name"
            value={target?.patronymic}
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
