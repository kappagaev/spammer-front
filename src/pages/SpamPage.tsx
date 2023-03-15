import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { apiCreateSpam, CreateSpamDto } from "../axios/api"
import { useFetch } from "../hooks/useFetch"
import { PaginationResponse } from "../types/pagination"
import { Spam } from "../types/spam"

export const SpamPage = () => {
  const { data } = useFetch<PaginationResponse<Spam>>({
    url: "/spam",
  })

  const { register, handleSubmit, setValue } = useForm<CreateSpamDto>()

  const navigate = useNavigate()
  const onSubmit = async (dto: CreateSpamDto) => {
    const responce = await apiCreateSpam({
      title: dto.title,
      content: dto.content,
      targets: [1, 2],
    })
    if (responce.status === 200) {
      console.log("success")
      navigate("/targets/")
    }
  }

  return (
    <div>
      <h1>Spam</h1>
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={(e) => {
          const spam = data?.data.find(
            (spam) => spam.id === parseInt(e.target.value)
          )
          if (spam) {
            setValue("title", spam.title)
            setValue("content", spam.content)
          }
        }}
      >
        <option value={0}>Select a spam</option>
        {data?.data.map((spam) => (
          <option key={spam.id} value={spam.id}>
            {spam.title}: {spam.content}
          </option>
        ))}
      </select>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group p-10">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter subject"
            {...register("title", {
              required: true,
            })}
          />
        </div>
        <br />
        <div className="row">
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Example textarea
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              {...register("content", {
                required: true,
              })}
            />
          </div>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}
