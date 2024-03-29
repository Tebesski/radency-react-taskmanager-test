import { Input, TextField } from "@mui/material"
import { COLORS } from "../../constants/colors"

type FormInputProps<T> = {
   placeholder?: string
   value: T
   multiline?: boolean
   textfield?: boolean
   required?: boolean
   changeHandler: React.Dispatch<React.SetStateAction<string>>
}

export default function FormInput<T>({
   placeholder,
   value,
   changeHandler,
   multiline,
   textfield,
   required,
}: FormInputProps<T>) {
   function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      changeHandler(e.target.value)
   }

   return textfield ? (
      <TextField
         required={required}
         multiline={multiline}
         rows={4}
         placeholder={placeholder}
         value={value}
         onChange={handleInputChange}
         sx={{
            border: `1px solid ${COLORS.main}`,
            "& .MuiOutlinedInput-root": {
               "& fieldset": {
                  borderColor: "transparent",
               },
               "&:hover fieldset": {
                  borderColor: COLORS.main,
                  borderRadius: 0,
               },
               "&.Mui-focused fieldset": {
                  borderColor: COLORS.main,
                  borderRadius: 0,
               },
            },
         }}
         variant="outlined"
      />
   ) : (
      <Input
         required={required}
         multiline={multiline}
         rows={4}
         placeholder={placeholder}
         value={value}
         onChange={handleInputChange}
         sx={{
            "&:before": {
               borderBottomColor: COLORS.main,
            },
            "&:after": {
               borderBottomColor: COLORS.main,
            },
         }}
      />
   )
}
