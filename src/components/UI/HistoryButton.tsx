import { Button, styled } from "@mui/material"

export const HistoryButton = styled(Button)({
   paddingLeft: "20px",
   paddingRight: "20px",
   flexDirection: "row",
   gap: "5px",
   color: "darkslategray",
   borderColor: "darkslategray",
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
