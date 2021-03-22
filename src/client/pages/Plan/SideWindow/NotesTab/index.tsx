import React, { memo, useEffect, useRef, useState } from 'react'
import { IRequirementDoc } from 'src/types/requirement'
import { useUpdateRequirementById } from 'src/api/requirement'
import styled from 'styled-components'
import { TextArea } from 'src/components/formElements'
import { useDebounce } from 'use-debounce'

interface NotesTabProps {
  requirement: IRequirementDoc
}

const Container = styled.div`
  padding: 0 .2rem .2rem .2rem;
`

const NotesTab = ({ requirement }: NotesTabProps) => {
  const [text, setText] = useState(requirement?.description)
  const handleChange = (e) => setText(e.currentTarget.value)
  const [debouncedText] = useDebounce(text, 1000, { leading: true })
  const { updateRequirement } = useUpdateRequirementById(requirement?._id)

  useEffect(() => {
    updateRequirement({
      description: debouncedText,
    })
  }, [debouncedText])

  const valueRef = useRef('')
  useEffect(() => {
    valueRef.current = text
  }, [text])

  useEffect(() => {
    return () => {
      updateRequirement({
        description: valueRef.current,
      })
    }
  }, [])

  return (
    <Container>
      <TextArea
        value={text}
        onChange={handleChange}
        fullWidth
        isDefaultHiddenBorders
        minRows={7}
        maxRows={9}
      />
    </Container>
  )
}

export default memo(NotesTab)
