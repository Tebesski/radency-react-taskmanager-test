import { Box, Button, Typography, styled } from "@mui/material"
import { COLORS } from "../../constants/colors"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"

type CommonProps = {
   hasText?: boolean
   text?: string
   onClick: () => void
   disabled: boolean
   disabledText: string
}

type SubmitButtonProps =
   | ({ hasIcon: false; icon?: never } & CommonProps)
   | ({ hasIcon: true; icon: IconProp } & CommonProps)

const SubmitButtonStyled = styled(Button)({
   width: 315,
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
   "&:Mui-disabled": {
      backgroundColor: "darkgray",
      borderColor: "darkgray",
      color: "lightgray",
   },
})

export default function SubmitButton({
   onClick,
   disabled,
   text,
   icon,
   disabledText,
}: SubmitButtonProps) {
   const DisabledButton = (
      <Typography variant="button">{disabledText}</Typography>
   )
   const EnabledButton = (
      <Box>
         {icon ? <FontAwesomeIcon icon={icon} /> : null}
         {text ? <Typography variant="button">{text}</Typography> : null}
      </Box>
   )

   return (
      <SubmitButtonStyled
         disableRipple
         disableElevation
         size="medium"
         variant="contained"
         disabled={disabled}
         onClick={onClick}
      >
         {disabled ? DisabledButton : EnabledButton}
      </SubmitButtonStyled>
   )
}
