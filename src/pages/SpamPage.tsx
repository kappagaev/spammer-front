import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { apiCreateSpam, CreateSpamDto } from "../axios/api"
import { useNotification } from "../context/NotificationContextProvider"
import { useFetch } from "../hooks/useFetch"
import { PaginationResponse } from "../types/pagination"
import { Spam } from "../types/spam"
import { Target } from "../types/target"

function useQuery() {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

export const SpamPage = () => {
  const { data } = useFetch<PaginationResponse<Spam>>({
    url: "/spam",
  })
  const { data: targets } = useFetch<PaginationResponse<Target>>({
    url: `/target?limit=1000`,
  })

  const query = useQuery()
  const [selectedTargets, setSelectedTargets] = useState<number[]>([])
  const { register, handleSubmit, setValue } = useForm<CreateSpamDto>()
  const { showNotification } = useNotification()

  const navigate = useNavigate()
  const onSubmit = async (dto: CreateSpamDto) => {
    if (selectedTargets.length === 0) {
      showNotification({
        title: "Error",
        message: "Select at least one target",
        status: "error",
      })
      return
    }
    const responce = await apiCreateSpam({
      title: dto.title,
      content: dto.content,
      targets: selectedTargets,
    })
    if (responce.status === 200) {
      console.log("success")
      showNotification({
        title: "Success",
        message: "Spam was created",
        status: "success",
      })
      navigate("/targets/")
    }
  }

  useEffect(() => {
    const tar = JSON.parse(query.get("targets") || "[]")
    setSelectedTargets(tar)
  }, [query])

  return (
    <div>
      <h1>Spam</h1>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue={0}
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
        <div className="list-group">
          {selectedTargets.map((targetId) => {
            const target = targets?.data.find(
              (target) => target.id === targetId
            )
            return (
              <div
                key={targetId}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {target?.email}
                <button
                  type="button"
                  className="btn-close"
                  onClick={(e) => {
                    e.preventDefault()
                    setSelectedTargets(
                      selectedTargets.filter((id) => id !== targetId)
                    )
                  }}
                />
              </div>
            )
          })}
        </div>
        <br />
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            const targetId = parseInt(e.target.value)
            if (targetId) {
              setSelectedTargets([...selectedTargets, targetId])
            }
          }}
          defaultValue=""
        >
          <option>Add target</option>
          {targets?.data
            .filter(({ id }) => !selectedTargets.includes(id))
            .map((target) => (
              <option key={target.id} value={target.id}>
                {target.email}
              </option>
            ))}
        </select>
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}
