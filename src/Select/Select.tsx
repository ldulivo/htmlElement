import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import { SelectProps } from "./SelectTypes";
import { SvgIconSelect } from "../Svg/SvgIconSelect";
import './selectClass.scss';

const Select: FC<SelectProps> = ({
  className = '',
  filter,
  label = '',
  options = [],
  renderOption,
  Value = '',
  OnChange,
  selectedOption,
  selectedOptionValue
}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  
  
  const handleInputClick = () => {
    if (Value) {
      setIsFilterActive(false);
    }
    setIsDropDownOpen(!isDropDownOpen);
    setFocusedIndex(null);
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (OnChange) {
      OnChange(event);
    }
    setIsFilterActive(true);
    setFocusedIndex(null);
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target as Node) &&
      dropDownRef.current &&
      !dropDownRef.current.contains(event.target as Node)
    ) {
      setIsDropDownOpen(false);
    }
  }

  const handleOptionClick = (option: any) => {
    if (selectedOption) {
      selectedOption(option);
    }
    setIsDropDownOpen(false);
    setIsFilterActive(true);
    setFocusedIndex(null);
  }

  const handleOptionSelectKeyDown = (option: any) => {
    if (selectedOption) {
      selectedOption(option);
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isDropDownOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        
        setFocusedIndex((prev) => {
          if (prev === null || prev === filteredOptions.length - 1) {
            if (Value && !isFilterActive) handleOptionSelectKeyDown(filteredOptions[0]);
            return 0;
          } else {
            if (Value && !isFilterActive) handleOptionSelectKeyDown(filteredOptions[prev + 1]);
            return prev + 1;
          }
        });
        break;

      case 'ArrowUp':
        event.preventDefault();
        
        setFocusedIndex((prev) => {
          if (prev === null || prev === 0) {
            if (Value && !isFilterActive) handleOptionSelectKeyDown(filteredOptions[filteredOptions.length - 1]);
            return filteredOptions.length - 1;
          } else {
            if (Value && !isFilterActive) handleOptionSelectKeyDown(filteredOptions[prev - 1]);
            return prev - 1;
          }
        });
        break;
        
      case 'Enter':
        event.preventDefault();
        if (focusedIndex !== null) {
          handleOptionClick(filteredOptions[focusedIndex]);
        }
        break;
      default:
        break;
    }
  }

  const filteredOptions = options.filter(option => isFilterActive && filter ? filter(option, Value) : true);

  const SelectDropDownOpen = () => {
    useEffect(() => {
      if (isDropDownOpen && focusedIndex !== null && optionRefs.current[focusedIndex]) {
        optionRefs.current[focusedIndex]?.scrollIntoView({ behavior: 'auto', block: 'nearest' });
      }
    }, [isDropDownOpen, focusedIndex]);

    useEffect(() => {
      if (isDropDownOpen && selectedOptionValue) {
        const index = filteredOptions.indexOf(selectedOptionValue);
        if (index !== -1) {
          setFocusedIndex(index);
        }
      }
    }, [isDropDownOpen, filteredOptions, selectedOptionValue]);

    return (
      <div
        className={`htmlElement--Select-list ${isDropDownOpen ? 'htmlElement--Select-list-expanded' : ''}`}
        ref={dropDownRef}
      >
        <ul>
          {
            filteredOptions?.map((option, index) => (
              <li
                key={index}
                ref={el => optionRefs.current[index] = el}
                onClick={() => handleOptionClick(option)}
                className={`${option === selectedOptionValue ? 'selected' : ''} ${index === focusedIndex ? 'focused' : ''}`}
              >
                {renderOption ? renderOption(option) : option}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  return (
    <div className={`htmlElement--Select ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={Value}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
      />
      <SvgIconSelect
        OnClick={handleInputClick}
      />
      <label>{label}</label>
      <SelectDropDownOpen />
    </div>
  )
}

export default Select