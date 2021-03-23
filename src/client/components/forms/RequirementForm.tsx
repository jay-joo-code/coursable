import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/buttons'
import { Checkbox, Input } from 'src/components/formElements'
import { FlexRow, Space } from 'src/components/layout'
import styled from 'styled-components'
import * as yup from 'yup'
import CourseSearch from '../courseSearch'
import Text from '../text'
import { courseName } from 'src/util/roster'
import theme from 'src/app/theme'
import Icon from '../icon'

interface RequirementFormProps {
  name?: string
  isFixedAssignment?: boolean
  courseData?: any
  onSubmit: (data: any) => void
}

const schema = yup.object().shape({
  name: yup.string().required('Requirement name is required'),
  isFixedAssignment: yup.boolean(),
})

const Container = styled.div`
  padding: 1rem;
  min-width: 350px;
`

const Form = styled.form`
`

const AssignmentContainer = styled.div`
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadow};
  padding: .5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RequirementForm = ({ name, isFixedAssignment, courseData, onSubmit }: RequirementFormProps) => {
  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: name || '',
      isFixedAssignment: isFixedAssignment || false,
    },
  })

  const [courseDataLocal, setCourseDataLocal] = useState(courseData)
  const handleClickCourse = (newCourseData) => setCourseDataLocal(newCourseData)

  const submitHandler = (data, event) => {
    event.preventDefault()
    onSubmit({
      ...data,
      courseId: courseDataLocal?.crseId || null,
    })
  }

  const handleRemoveAssignment = () => setCourseDataLocal(null)

  return (
    <Container>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Input
          name='name'
          label='Requirement name'
          ref={register}
          error={errors.name?.message || undefined}
          fullWidth
        />
        <Space margin='1.5rem 0' />

        {/* course search */}
        {!courseDataLocal && (
          <>
            <CourseSearch
              handleClickCourse={handleClickCourse}
            />
            <Space margin='20rem 0' />
          </>
        )}

        {/* show assigned course */}
        {courseDataLocal && (
          <>
            <div>
              <AssignmentContainer>
                <div>
                  <Text
                    variant='h5'
                  >{courseName(courseDataLocal)}</Text>
                  <Text
                    variant='h6'
                    color={theme.textLight}
                  >{courseDataLocal?.titleShort}</Text>
                </div>
                <Icon
                  variant='close'
                  interactiveHover
                  onClick={handleRemoveAssignment}
                />
              </AssignmentContainer>
              <Space margin='.5rem 0' />
              <Text
                variant='h6'
                color={theme.textMuted}
                style={{ marginLeft: '.3rem' }}
              >{watch('isFixedAssignment') ? `${courseName(courseDataLocal)} is fixed to this requirement` : ''}</Text>
              <Space margin='1rem 0' />
              <Checkbox
                name='isFixedAssignment'
                label='Fix course to this requirement'
                ref={register}
                error={errors.isFixedAssignment?.message || undefined}
              />
            </div>
          </>
        )}
        <Space margin='2rem 0' />
        <FlexRow justifyEnd>
          <Button
            label='Save'
            type='submit'
          />
        </FlexRow>
      </Form>
    </Container>
  )
}

export default RequirementForm
