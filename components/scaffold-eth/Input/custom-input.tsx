import { useEffect, useState } from 'react'
import { CommonInputProps, InputBase, IntegerVariant, isValidInteger } from '~~/components/scaffold-eth'

type IntegerInputProps = CommonInputProps<string | bigint> & {
  variant?: IntegerVariant
  disableMultiplyBy1e18?: boolean
}

export function CustomInput({
  value,
  onChange,
  name,
  placeholder,
  disabled,
  variant = IntegerVariant.UINT256,
  disableMultiplyBy1e18 = false,
}: IntegerInputProps) {
  const [inputError, setInputError] = useState(false)

  useEffect(() => {
    if (isValidInteger(variant, value, false)) {
      setInputError(false)
    } else {
      setInputError(true)
    }
  }, [value, variant])

  return (
    <InputBase
      name={name}
      value={value}
      placeholder={placeholder}
      error={inputError}
      onChange={onChange}
      disabled={disabled}
      suffix={
        !inputError &&
        !disableMultiplyBy1e18 && (
          <div
            className="space-x-4 flex tooltip tooltip-top tooltip-secondary before:content-[attr(data-tip)] before:right-[-10px] before:left-auto before:transform-none"
            data-tip="current coin is ETH"
          >
            <button
              className={`${
                disabled ? 'cursor-not-allowed' : 'cursor-pointer'
              } font-semibold px-4 bg-neutral rounded-r-full text-neutral-content`}
              disabled={disabled}
            >
              ETH
            </button>
          </div>
        )
      }
    />
  )
}
