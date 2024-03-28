import { DialogTitle, IconButton } from "@mui/material"
import { COLORS } from "../../../constants/colors"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWindowClose } from "@fortawesome/free-solid-svg-icons"

export default function AddTaskModalTitle({
   onClose,
}: {
   onClose: () => void
}) {
   return (
      <DialogTitle
         sx={{
            backgroundColor: COLORS.main,
            height: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: 1,
         }}
      >
         <IconButton disableRipple onClick={onClose}>
            <FontAwesomeIcon
               style={{ fontSize: 20 }}
               icon={faWindowClose}
               color={COLORS.light}
            />
         </IconButton>
      </DialogTitle>
   )
}
