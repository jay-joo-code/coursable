import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/buttons'
import { Checkbox, HookedDatePicker, HookedDateRangePicker, HookedIncrementor, HookedRadioGroup, HookedSelect, Input, TextArea } from 'src/components/formElements'
import { FlexRow } from 'src/components/layout'
import styled from 'styled-components'
import * as yup from 'yup'

const schema = yup.object().shape({
  inputName: yup.string().required('This is a required field'),
  textAreaName: yup.string().required('This is a required field'),
  checkboxName: yup.boolean().oneOf([true], 'Must check this checkbox'),
  selectName: yup.object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .typeError('Must select an option'),
  radioGroupName: yup.string().required('Must pick an option'),
  datePickerName: yup.date().typeError('Must pick a date'),
  dateRangePickerName: yup.object()
    .shape({
      startDate: yup.date().typeError('Must pick a start date'),
      endDate: yup.date().typeError('Must pick an end date'),
    })
    .typeError('Must select a date range')
    .required('Must select a date range'),
  incrementorName: yup.number().min(3, 'Minimum 3 required'),
})

const Container = styled.div`
  padding: 1rem;

  /* datepickers need at least 350px width */
  min-width: 350px; 
`

const Form = styled.form`
  & > * {
    margin-bottom: 1rem;
  }
`

const DefaultForm = () => {
  const { register, control, handleSubmit, watch, errors, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      inputName: 'default text',
      textAreaName: 'default text',
      checkboxName: false,
      selectName: null,
      radioGroupName: null,
      datePickerName: null,
      dateRangePickerName: null,
      incrementorName: 1,
    },
  })

  // console.log('errors :>> ', errors)
  // console.log(watch('incrementorName'))

  const onSubmit = (data, event) => {
    event.preventDefault()
    console.log('data', data)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='inputName'
          label='inputName'
          ref={register}
          error={errors.inputName?.message}
          fullWidth
        />
        <TextArea
          name='textAreaName'
          label='textAreaName'
          ref={register}
          error={errors.textAreaName?.message}
          fullWidth
          minRows={3}
          maxRows={5}
        />
        <Checkbox
          name='checkboxName'
          label='checkboxName'
          ref={register}
          error={errors.checkboxName?.message}
        />
        <HookedSelect
          name='selectName'
          control={control}
          options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
          ]}
          error={errors.selectName?.message}
        />
        <HookedRadioGroup
          name='radioGroupName'
          ref={register}
          error={errors.radioGroupName?.message}
          options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
          ]}
        />
        <HookedDatePicker
          name='datePickerName'
          control={control}
          error={errors.datePickerName?.message}
        />
        <HookedDateRangePicker
          name='dateRangePickerName'
          control={control}
          setValue={setValue}
          error={errors.dateRangePickerName?.message}
        />
        <HookedIncrementor
          name='incrementorName'
          control={control}
          label='incrementorName'
          error={errors.incrementorName?.message}
        />
        <FlexRow je>
          <Button
            label='Submit'
            type='submit'
          />
        </FlexRow>
      </Form>
    </Container>
  )
}

export default DefaultForm
