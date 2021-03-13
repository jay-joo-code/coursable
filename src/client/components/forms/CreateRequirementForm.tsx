import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Button } from '../buttons'
import { Input } from '../formElements'
import { FlexColumn, FlexRow, Space } from '../layout'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
})

interface CreateRequirementFormProps {

}

const Container = styled.div`
  
`

const CreateRequirementForm = ({ }: CreateRequirementFormProps) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data, event) => {
    event.preventDefault()
    console.log(data)

    // name
    // credits default 3
    // isFixedAssignment true if courseId is set
    // courseId
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexColumn>
        <Input
          name='name'
          label='Name'
          ref={register}
          error={errors.name?.message}
        />
        <Space margin='.5rem 0' />
        <FlexRow je>
          <Button
            label='Create'
            type='submit'
          />
        </FlexRow>
      </FlexColumn>
    </form>
  )
}

export default CreateRequirementForm
