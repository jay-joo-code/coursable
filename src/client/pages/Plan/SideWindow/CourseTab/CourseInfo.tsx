import React, { useState } from 'react'
import { useUpdateRequirementById } from 'src/api/requirement'
import theme from 'src/app/theme'
import { Button } from 'src/components/buttons'
import { FlexColumn, FlexRow, Space } from 'src/components/layout'
import Text from 'src/components/text'
import Span from 'src/components/text/Span'
import { ICourseDoc } from 'src/types/course'
import { IRequirementDoc } from 'src/types/requirement'
import styled from 'styled-components'

interface CourseInfoProps {
  requirement: IRequirementDoc | undefined
  assignedCourse: ICourseDoc | undefined
}

const Container = styled(FlexColumn)`
  width: 260px;
  align-items: flex-start;
`

interface DescriptionProps {
  isExpanded: boolean
}

const Description = styled(Text)<DescriptionProps>`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  // isExpanded
  display: ${(props) => props.isExpanded && 'unset'};
`

const ReadMoreButton = styled.button`
  font-size: .9rem;
  color: ${(props) => props.theme.brand};
  font-weight: 500;
  background: white;
  display: inline-block;
  cursor: pointer;
  padding: 0;
`

const CourseInfo = ({ requirement, assignedCourse }: CourseInfoProps) => {
  const { catalogWhenOffered, catalogPrereqCoreq, description, subject, catalogNbr } = assignedCourse?.data || {}
  const { isFixedAssignment } = requirement || {}
  const [isExpanded, setIsExpanded] = useState(false)
  const { updateRequirement } = useUpdateRequirementById(requirement?._id)

  const handleUnassign = () => {
    updateRequirement({
      courseId: null,
      course: null,
    })
  }

  // TODO: dynamically generate latest semester slug
  const offerings = catalogWhenOffered?.slice(0, -1).split(', ') || []
  const semesterSlug = offerings.includes('Spring')
    ? 'SP21'
    : offerings.includes('Fall')
      ? 'FA20'
      : null

  return (
    <Container>
      {catalogWhenOffered && (
        <>
          <Text
            variant='h5'
            fontWeight={500}
          >When offered</Text>
          <Text
            variant='h5'
            color={theme.textLight}
          >{catalogWhenOffered}</Text>
          <Space margin='.5rem 0' />
        </>
      )}
      <Text
        variant='h5'
        fontWeight={500}
      >Prerequisites / Corequisites</Text>
      <Text
        variant='h5'
        color={theme.textLight}
      >{catalogPrereqCoreq || 'None'}</Text>
      <Space margin='.5rem 0' />
      {description && (
        <>
          <Text
            variant='h5'
            fontWeight={500}
          >Description</Text>
          <Description
            variant='h5'
            isExpanded={isExpanded}
            color={theme.textLight}
          >{description}</Description>
          <Space margin='.2rem 0' />
          <ReadMoreButton onClick={() => setIsExpanded(!isExpanded)}>Read {isExpanded ? 'less' : 'more'}</ReadMoreButton>
          <Space margin='.5rem 0' />
        </>
      )}
      <Text
        variant='h5'
        fontWeight={500}
      >Links</Text>
      <Text variant='h6'>
        {semesterSlug && (
          <>
            <a
              href={`https://classes.cornell.edu/browse/roster/${semesterSlug}/class/${subject}/${catalogNbr}`}
              target='_blank'
              rel='noreferrer'
            >
              <Span
                underline
                color={theme.info}
              >Roster</Span>
            </a> •
          </>
        )}
        <a
          href={`https://www.google.com/search?q=cornell+reddit+${subject}+${catalogNbr}`}
          target='_blank'
          rel='noreferrer'
        >
          <Span
            underline
            color={theme.info}
          > Reddit</Span>
        </a> •
        <a
          href={`https://www.cureviews.org/course/${subject}/${catalogNbr}`}
          target='_blank'
          rel='noreferrer'
        >
          <Span
            underline
            color={theme.info}
          > Reviews</Span>
        </a>
      </Text>
      {isFixedAssignment && <Space margin='1rem 0' />}
      {!isFixedAssignment && (
        <>
          <Space margin='1.5rem 0' />
          <FlexRow
            justifyEnd
            fullWidth
          >
            <Button
              label='unassign'
              onClick={handleUnassign}
              text
            />
          </FlexRow>
        </>
      )}
    </Container>
  )
}

export default CourseInfo
