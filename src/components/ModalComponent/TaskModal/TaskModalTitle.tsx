import { DialogTitle, IconButton } from "@mui/material"
import { COLORS } from "../../../constants/colors"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"

export default function TaskModalTitle({
   onCloseTaskModal,
}: {
   onCloseTaskModal: () => void
}) {
   return (
      <DialogTitle
         sx={{
            backgroundColor: COLORS.main,
            height: 20,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
         }}
      >
         <IconButton disableRipple onClick={onCloseTaskModal}>
            <FontAwesomeIcon
               style={{ fontSize: 30 }}
               icon={faClose}
               color={COLORS.light}
            />
         </IconButton>
      </DialogTitle>
   )
}
