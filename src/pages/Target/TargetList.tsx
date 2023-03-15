import { useState } from "react"
import { Pagination } from "../../components/Pagination"
import { TargetTable } from "../../components/table/TargetTable"
import { useFetch } from "../../hooks/useFetch"
import { PaginationResponse } from "../../types/pagination"
import { Target } from "../../types/target"

export const TargetList = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const changePage = (page: number) => {
    setPage(page)
    console.log(page)
  }

  const { data } = useFetch<PaginationResponse<Target>>({
    url: `/target?page=${page}&limit=${limit}`,
  })

  return (
    <>
      <label htmlFor="limit">Limit</label>
      <select
        className="form-select"
        id="limit"
        onChange={(e) => setLimit(Number(e.target.value))}
        defaultValue={limit}
      >
        <option value="1">1</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <TargetTable targets={data?.data} />
      {data !== null && data?.total > limit ? (
        <Pagination {...data} onChange={changePage} />
      ) : null}
    </>
  )
}
