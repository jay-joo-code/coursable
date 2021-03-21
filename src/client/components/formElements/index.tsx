import moment from 'moment'
import React, { useState, InputHTMLAttributes, forwardRef } from 'react'

import {
  DateRangePicker as DateRangePickerAirbnb, DayPickerSingleDateController, isInclusivelyAfterDay
} from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { Controller } from 'react-hook-form'
import theme from 'src/app/theme'
import useIsMobile from 'src/hooks/useIsMobile'
import Icon from '../icon'
import { FlexRow } from '../layout'
import Text from '../text'
import Label from '../text/Label'
import './datepicker.less'
import {
  CheckboxContainer,
  InputArea,
  InputContainer,
  RadioGroupContainer,
  RadioLabel,
  StyledCheckbox,
  StyledDateRangeWrapper,
  StyledDateWrapper,
  StyledInput,
  StyledSelect, StyledTextArea,
  TextAreaContainer
} from './styles'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string
  label?: string
  value?: any
  placeholder?: string
  onEnterPress?: () => void
  autoFocus?: boolean
  disabled?: boolean
  width?: number
  fullWidth?: boolean
  error?: string
  type?: string
}

const ErrorMsg = (props: { error?: string }) => {
  return (
    <>
      {props.error && <Text
        variant='h6'
        color={theme.danger}
        fontWeight={400}
      >{props.error}</Text>}
    </>
  )
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && props.onEnterPress) {
      props.onEnterPress()
    }
  }

  return (
    <InputContainer>
      <Label {...props}>{props.label}</Label>
      <InputArea>
        <StyledInput
          {...props}
          ref={ref}
          onKeyDown={handleKeyDown}
          error={props.error != null}
        />
      </InputArea>
      <ErrorMsg error={props.error} />
    </InputContainer>
  )
})

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  checked?: boolean
  onChange?: React.FormEventHandler<HTMLInputElement>
  name?: string
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  return (
    <div>
      <CheckboxContainer>
        <StyledCheckbox>
          <input
            {...props}
            ref={ref}
            type='checkbox'
            onChange={props.onChange}
            checked={props.checked}
          />
          <span />
        </StyledCheckbox>
        <Label
          noMargin={true}
          {...props}
        >
          {props.label}
        </Label>
      </CheckboxContainer>
      <ErrorMsg error={props.error} />
    </div>
  )
})

export interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name?: string
  label?: string
  value?: any
  placeholder?: string
  onEnterPress?: () => void
  autoFocus?: boolean
  disabled?: boolean
  width?: number
  fullWidth?: boolean
  error?: string
  type?: string
  style?: any
  maxRows?: number
  minRows?: number
  isDefaultHiddenBorders?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  return (
    <TextAreaContainer>
      <Label {...props}>{props.label}</Label>
      <div>
        <StyledTextArea
          {...props}
          ref={ref}
          error={props.error != null}
        />
      </div>
      <ErrorMsg error={props.error} />
    </TextAreaContainer>
  )
})

export interface IOption {
  label: string
  value: any
}

export interface SelectProps {
  options: IOption[]
  value?: string
  onChange?: React.FormEventHandler<HTMLInputElement>
  label?: string
  disabled?: boolean
  maxMenuHeight?: number
}

export const Select = forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
  const valueObject = props.options.find(
    (option) => option.value === props.value
  )
  return (
    <div>
      <Label {...props}>{props.label}</Label>
      <StyledSelect
        ref={ref}
        isDisabled={props.disabled}
        theme={(defaultStyles) => ({
          ...defaultStyles,
          colors: {
            ...defaultStyles.colors,
            primary25: theme.brandLight,
            primary50: theme.bgWash2,
            primary: theme.brand,
          },
        })}
        {...props}
        value={valueObject}
        key={`select-key-${JSON.stringify(valueObject)}`}
        isSearchable={false}
      />
    </div>
  )
})

export interface HookedSelectProps {
  name: string
  control: any
  options: IOption[]
  error: string | undefined
}

export const HookedSelect = (props: HookedSelectProps) => {
  return (
    <div>
      <Controller
        name={props.name}
        control={props.control}
        options={[
          { value: 'chocolate', label: 'Chocolate' },
          { value: 'strawberry', label: 'Strawberry' },
          { value: 'vanilla', label: 'Vanilla' },
        ]}
        as={StyledSelect}
      />
      <ErrorMsg error={props.error} />
    </div>
  )
}

interface RadioGroupProps extends InputProps {
  value: any
  setValue: (newValue: string) => void
  options: IOption[]
}

export const RadioGroup = (props: RadioGroupProps) => {
  const handleRadioClick = (e, value) => {
    if (e.target.checked) {
      if (value === props.value) {
        // already checked, uncheck
        props.setValue('')
      } else {
        // check
        props.setValue(value)
      }
    }
  }

  return (
    <RadioGroupContainer>
      {props.options.map(({ value, label }) => (
        <RadioLabel key={value}>
          <input
            type='radio'
            value={value}
            checked={props.value === value}
            onClick={(e) => handleRadioClick(e, value)}
          />
          <span>{label}</span>
        </RadioLabel>
      ))}
    </RadioGroupContainer>
  )
}

interface HookedRadioGroupProps extends InputProps {
  name: string
  options: IOption[]
  error: string | undefined
}

export const HookedRadioGroup = forwardRef<HTMLInputElement, HookedRadioGroupProps>((props, ref) => {
  return (
    <RadioGroupContainer>
      {props.options.map(({ value, label }) => (
        <RadioLabel key={value}>
          <input
            ref={ref}
            type='radio'
            name={props.name}
            value={value}
          />
          <span>{label}</span>
        </RadioLabel>
      ))}
      <ErrorMsg error={props.error} />
    </RadioGroupContainer>
  )
})

export interface DatePickerProps {
  date: Date | undefined
  setDate: (newDate: any) => void
}

export const DatePicker = (props: DatePickerProps) => {
  const handleDateChange = (newDate) => {
    props.setDate(newDate.toDate())
  }

  return (
    <StyledDateWrapper>
      <DayPickerSingleDateController
        {...props}
        onDateChange={handleDateChange}
        focused={true}
        date={props.date && moment(props.date)}
        hideKeyboardShortcutsPanel={true}
        isOutsideRange={(day) => !isInclusivelyAfterDay(day, moment())}
      />
    </StyledDateWrapper>
  )
}

export interface HookedDatePickerProps {
  name: string
  control: any
  error?: string
}

export const HookedDatePicker = (props: HookedDatePickerProps) => {
  return (
    <div>
      <Controller
        name={props.name}
        control={props.control}
        render={({ onChange, value }) =>
          <DatePicker
            setDate={onChange}
            date={value}
          />
        }
      />
      <ErrorMsg error={props.error} />
    </div>
  )
}

export interface DateRangePickerProps {
  label: string
  startDate: Date | undefined
  endDate: Date | undefined
  setStartDate: (newDate: any) => void
  setEndDate: (newDate: any) => void
}

export const DateRangePicker = ({ label, startDate, endDate, setStartDate, setEndDate }: DateRangePickerProps) => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  const handleFocusChange = (newFocus) => setFocusedInput(newFocus)

  const handleDateChange = ({ startDate: startDateAirbnb, endDate: endDateAirbnb }) => {
    if (startDateAirbnb) setStartDate(startDateAirbnb.toDate())
    if (endDateAirbnb) setEndDate(endDateAirbnb.toDate())
  }

  const isMobile = useIsMobile()

  return (
    <StyledDateRangeWrapper>
      <Label>{label}</Label>
      <DateRangePickerAirbnb
        startDateId='start-date-id'
        endDateId='end-date-id'
        startDate={startDate ? moment(startDate) : null}
        endDate={endDate ? moment(endDate) : null}
        onDatesChange={handleDateChange}
        focusedInput={focusedInput}
        onFocusChange={handleFocusChange}
        withPortal={isMobile}
        orientation={isMobile ? 'vertical' : 'horizontal'}
        readOnly
      />
    </StyledDateRangeWrapper>
  )
}

export interface HookedDateRangePickerProps {
  name: string
  control: any
  setValue: Function
  error?: string
}

export const HookedDateRangePicker = (props: HookedDateRangePickerProps) => {
  return (
    <div>
      <Controller
        name={props.name}
        control={props.control}
        render={({ onChange, value }) =>
          <DateRangePicker
            label='dateRangePickerName'
            startDate={value?.startDate}
            endDate={value?.endDate}
            setStartDate={(date) => props.setValue('dateRangePickerName', { ...value, startDate: date })}
            setEndDate={(date) => props.setValue('dateRangePickerName', { ...value, endDate: date })}
          />
        }
      />
      <ErrorMsg error={props.error} />
    </div>
  )
}

interface IncrementorProps {
  value: number
  label: string
  onChange: (newValue: number) => void
  minValue?: number
  maxValue?: number
  step?: number
}

export const Incrementor = ({
  value,
  label,
  onChange,
  minValue,
  maxValue,
  step = 1,
}: IncrementorProps) => {
  const isMobile = useIsMobile()
  const handleMinusClick = () => {
    const newValue = value - step
    if (minValue !== undefined) {
      onChange(Math.max(minValue, newValue))
    } else {
      onChange(newValue)
    }
  }

  const handlePlusClick = () => {
    const newValue = value + step
    if (maxValue !== undefined) {
      onChange(Math.min(maxValue, newValue))
    } else {
      onChange(newValue)
    }
  }

  return (
    <FlexRow
      alignCenter

      fullWidth
    >
      <Text
        variant={isMobile ? 'h4' : 'p'}
        fontWeight={500}
      >
        {label}
      </Text>
      <FlexRow alignCenter>
        <Icon
          variant='remove-circle'
          fill={theme.brand}
          pointer
          size='2rem'
          onClick={handleMinusClick}
        />
        <FlexRow
          justifyCenter
          alignCenter
          style={{ width: '40px' }}
        >
          <Text variant='h4'>{value}</Text>
        </FlexRow>
        <Icon
          variant='add-circle'
          fill={theme.brand}
          pointer
          size='2rem'
          onClick={handlePlusClick}
        />
      </FlexRow>
    </FlexRow>
  )
}

export interface HookedIncrementorProps {
  name: string
  control: any
  label: string
  error?: string
}

export const HookedIncrementor = (props: HookedIncrementorProps) => {
  return (
    <div>
      <Controller
        name={props.name}
        control={props.control}
        render={({ onChange, value }) =>
          <Incrementor
            label={props.label}
            value={value}
            onChange={onChange}
          />
        }
      />
      <ErrorMsg error={props.error} />
    </div>
  )
}
