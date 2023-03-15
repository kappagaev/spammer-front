import { useState } from "react"
import { Pagination } from "../../components/Pagination"
import { TargetTable } from "../../components/table/TargetTable"
import { useFetch } from "../../hooks/useFetch"
import { PaginationResponse } from "../../types/pagination"
import { Target } from "../../types/target"

export const TargetList = () => {
  const [page, setPage] = useState(1)
  const changePage = (page: number) => {
    setPage(page)
    console.log(page)
  }

  const { data } = useFetch<PaginationResponse<Target>>({
    url: `/target?page=${page}`,
  })

  return (
    <>
      <TargetTable targets={data?.data} />
      {data !== null ? <Pagination {...data} onChange={changePage} /> : null}
    </>
  )
}
