import { Button, Typography, styled } from "@mui/material"
import { COLORS } from "../../constants/colors"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const AddListButtonStyled = styled(Button)({
   paddingLeft: "20px",
   paddingRight: "20px",
   flexDirection: "row",
   gap: "5px",
   color: "#e2e6e7",
   backgroundColor: "darkslategray",
   borderColor: "darkslategray",
   "&:hover": {
      backgroundColor: "#222220",
      borderColor: "darkslategray",
   },
   "&:active": {
      backgroundColor: COLORS.light,
      borderColor: "darkslategray",
      color: COLORS.dark,
   },
})

export default function AddListButton({ onClick }: { onClick: () => void }) {
   return (
      <AddListButtonStyled
         disableRipple
         size="small"
         variant="contained"
         disableElevation
         onClick={onClick}
      >
         <FontAwesomeIcon icon={faPlus} />
         <Typography variant="button">Create new list</Typography>
      </AddListButtonStyled>
   )
}
