import styled from "@emotion/styled"
import React from "react"
import { useRouter } from "next/router"
import { useTagsQuery } from "src/hooks/useTagsQuery"

const CategoryBar: React.FC = () => {
  const router = useRouter()
  const currentTag = router.query.tag || "All"
  const data = useTagsQuery()

  // "All" + 실제 태그들
  const tagList = ["All", ...Object.keys(data)]

  const onClickTag = (tag: string) => {
    router.push({
      query: {
        ...router.query,
        tag: tag === "All" ? undefined : tag,
      },
    })
  }

  return (
    <StyledWrapper>
      {tagList.map((tag) => (
        <button
          key={tag}
          data-active={tag === currentTag}
          onClick={() => onClickTag(tag)}
        >
          {tag}
        </button>
      ))}
    </StyledWrapper>
  )
}

export default CategoryBar

const StyledWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  button {
    cursor: pointer;
    background: none;
    border: none;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.gray11};

    &[data-active="true"] {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray12};
      border-bottom: 2px solid ${({ theme }) => theme.colors.gray11};
    }

    &:hover {
      color: ${({ theme }) => theme.colors.gray12};
    }
  }
`
