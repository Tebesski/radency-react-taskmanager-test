import { Button, styled } from "@mui/material"

export const AddCardButton = styled(Button)({
   paddingLeft: "20px",
   paddingRight: "20px",
   flexDirection: "row",
   gap: "5px",
   color: "darkslategray",
   border: "1px dashed darkslategray",
   "&:hover": {
      backgroundColor: "#e2e6e7",
      borderColor: "darkslategray",
   },
   "&:active": {
      backgroundColor: "#243b35",
      borderColor: "darkslategray",
      color: "#e2e6e7",
   },
})
