import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react'
import styled from 'styled-components'

interface InputProps {
	onChange: (a: string) => void
	disabled?: boolean
	placeholder?: string
	value?: string
	width?: string
}

export const Input = ({
	disabled,
	placeholder,
	value,	
	onChange,
	width,
}: InputProps) => {
	const [focus, setFocus] = useState(false)

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
	},[onChange])

	return (
		<Container			
			disabled={disabled}
			onBlur={() => setFocus(false)}
			onChange={handleChange}
			onFocus={() => setFocus(true)}
			focus={focus}			
			placeholder={placeholder}			
			value={value}	
			width={width}		
		/>
	)
}

// Styles
const Container = styled.input<Omit<InputProps, 'action' | 'onChange'> & { focus: boolean }>`
	background-color: ${(props) =>
		props.disabled ? 'rgba(255,255,255,0.1)' : '#040404'};
	border: 1px solid #212121;
	border-radius: 8px;
	color: ${(props) => (props.disabled ? '#999' : '#fff')};
	font-size: 16px;
	height: 56px;
	margin: 0px;
	padding: 0px 16px;
	transition: all 0.16s linear;
	width: ${(props) => (props.width ? props.width : '100%')};

	&:focus, &:focus-visible {
		outline: none;
	}
`
