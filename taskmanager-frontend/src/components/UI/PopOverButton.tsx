import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, styled } from "@mui/material"

type PopOverButtonProps = {
   text: string
   icon: IconProp
   color: string
   onClick: () => void
}

export default function PopOverButton({
   text,
   icon,
   color,
   onClick,
}: PopOverButtonProps) {
   const PopOverButtonStyled = styled(Button)({
      padding: "10px",
      flexDirection: "row",
      gap: "5px",
      color,
      width: "100%",
      height: 30,
      fontWeight: 600,
      justifyItems: "center",
      justifyContent: "flex-start",
      margin: 2,
   })

   return (
      <PopOverButtonStyled size="small" onClick={onClick}>
         <FontAwesomeIcon size="xs" icon={icon} />
         {text}
      </PopOverButtonStyled>
   )
}
