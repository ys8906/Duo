import React from "react"
import { AllSentencesQuery } from "../../../graphql/types"

interface Props {
  data: AllSentencesQuery
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: React.FC<Props> = ({ data, currentPage, setCurrentPage }) => {
  const moveTargetPage = (e) => {
    setCurrentPage(Number(e.target.value))
  }
  const moveAdjacentPage = (number) => {
    setCurrentPage(currentPage + number)
  }
  if (data) {
    const { pageInfo } = data.sentences
    const list = []

    let min: number
    let max: number
    if (pageInfo.totalPages < 10) {
      ;[min, max] = [1, pageInfo.totalPages]
    } else if (currentPage < 10) {
      ;[min, max] = [1, 10]
    } else if (currentPage + 5 > pageInfo.totalPages) {
      ;[min, max] = [pageInfo.totalPages - 10, pageInfo.totalPages]
    } else {
      ;[min, max] = [currentPage - 5, currentPage + 5]
    }

    for (let i = 0; i < 11; i += 1) {
      const pageNum = min + i
      if (i + 1 > max) break
      list.push(
        <button
          type="button"
          className={`pagination__item${
            currentPage === pageNum ? " selected" : ""
          }`}
          key={pageNum}
          value={pageNum}
          onClick={moveTargetPage}
        >
          {pageNum}
        </button>
      )
    }
    return (
      <div className="pagination">
        {currentPage > 1 && (
          <button
            type="button"
            className="pagination__item"
            onClick={() => moveAdjacentPage(-1)}
          >
            ◀︎
          </button>
        )}
        {list}
        {currentPage < pageInfo.totalPages && (
          <button
            type="button"
            className="pagination__item"
            onClick={() => moveAdjacentPage(1)}
          >
            ▶︎
          </button>
        )}
      </div>
    )
  }
  return null
}

export default Pagination
