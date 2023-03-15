import axios from "axios"
import { Target } from "../types/target"

const baseURL = "http://localhost:3000/api"

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default api

export interface UpateTargetDto {
  name: string
  email: string
  surname: string
  patronymic: string
}
export const apiUpdateTarget = (id: number, target: UpateTargetDto) => {
  return api.put(`/target/${id}`, target)
}

export const apiCreateTarget = (target: Target) => {
  return api.post("/target", target)
}

export const apiDeleteTarget = (id: number) => {
  return api.delete(`/target/${id}`)
}

export interface CreateSpamDto {
  title: string
  content: string
  targets: number[]
}
export const apiCreateSpam = (dto: CreateSpamDto) => {
  return api.post("/spam", dto)
}
