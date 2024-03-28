import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, styled } from "@mui/material"
import { COLORS } from "../../constants/colors"

type ModalButtonProps = {
   text: string
   icon: IconProp
   width?: string
   onClick?: () => void
   color?: string
   activeBgColor?: string
   activeBorderColor?: string
   activeColor?: string
}

export default function ModalButton({
   text,
   icon,
   color = COLORS.main,
   activeBgColor = COLORS.main_darker,
   activeBorderColor = COLORS.main,
   activeColor = COLORS.light,
   onClick,
   width,
}: ModalButtonProps) {
   const ModalButtonStyled = styled(Button)({
      padding: "10px",
      flexDirection: "row",
      border: `1px dashed ${color}`,
      gap: 5,
      color,
      width,
      height: 30,
      fontWeight: 600,
      justifyItems: "center",
      justifyContent: "center",
      "&:hover": {
         backgroundColor: "#e2e6e7",
         borderColor: "darkslategray",
      },
      "&:active": {
         backgroundColor: `${activeBgColor}`,
         borderColor: `${activeBorderColor}`,
         color: `${activeColor}`,
      },
   })

   return (
      <ModalButtonStyled size="small" onClick={onClick} disableRipple>
         <FontAwesomeIcon size="xs" icon={icon} />
         {text}
      </ModalButtonStyled>
   )
}
