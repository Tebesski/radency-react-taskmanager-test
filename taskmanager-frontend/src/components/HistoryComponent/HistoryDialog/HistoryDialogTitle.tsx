import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DialogTitle, IconButton, Typography } from "@mui/material"
import { COLORS } from "../../../constants/colors"

export default function HistoryDialogTitle({
   onCloseHistory,
}: {
   onCloseHistory: () => void
}) {
   return (
      <DialogTitle
         sx={{
            backgroundColor: COLORS.main,
            height: 30,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
         }}
      >
         <Typography
            sx={{ fontWeight: 500, fontSize: 20 }}
            color={COLORS.light}
         >
            History
         </Typography>

         <IconButton disableRipple onClick={onCloseHistory}>
            <FontAwesomeIcon
               style={{ fontSize: 24 }}
               icon={faClose}
               color={COLORS.light}
            />
         </IconButton>
      </DialogTitle>
   )
}
