import { FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useState } from "react"


interface Props {

    items: string[]
    checked?: string[]
    onChange: (items: string[]) => void
}


function CheckboxSidebar({items, checked, onChange}: Props) {

  const [checkedItems, setCheckedItems] = useState(checked || [])

  function handleChecked(value: string) {

    const currentIndex = checkedItems.findIndex(item => item === value);

    let newChecked: string[] = []
    //checking if new items added to the array if currentIndex - 1
    if(currentIndex === - 1) newChecked = [...checkedItems, value]
    //list of items minus unchecked
    else newChecked = checkedItems.filter(item => item !== value)

    setCheckedItems(newChecked)
    onChange(newChecked)
  }


  return (

    <FormGroup>
      {items.map(item => (
        <FormControlLabel  
        control={<Checkbox 
            checked={checkedItems.indexOf(item) !== -1} 
            onClick={() => handleChecked(item)}  
            color="default"/>} 
            key={item} 
            label={item} />
      ))}
  
 
  </FormGroup>
  )
}

export default CheckboxSidebar