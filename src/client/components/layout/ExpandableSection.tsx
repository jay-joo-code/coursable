import React, { useState } from 'react'
import { FlexRow, Space } from '.'
import Icon from '../icon'
import styled from 'styled-components'
import Text from '../text'

const Container = styled.div`
  margin-bottom: 1rem;
`

interface ExpandableSectionProps {
  heading: string
  children: React.ReactNode
  expandedDefault?: boolean
}

const ExpandableSection = ({ heading, expandedDefault, children }: ExpandableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(expandedDefault || false)

  return (
    <Container>
      <FlexRow
        alignCenter
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer' }}
      >
        <Text
          variant='p'
          fontWeight={500}
        >{heading}</Text>
        <Space margin='0 .2rem' />
        {isExpanded
          ? <Icon
              variant='up'
              pointer
              size='1.5rem'
          />
          : <Icon
              variant='down'
              pointer
              size='1.5rem'
          />
        }
      </FlexRow>
      {isExpanded && children}
    </Container>
  )
}

export default ExpandableSection
