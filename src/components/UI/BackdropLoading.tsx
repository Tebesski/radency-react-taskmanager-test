import { Backdrop, CircularProgress } from "@mui/material"

export default function BackdropLoading({ isOpen }: { isOpen: boolean }) {
   return (
      <Backdrop
         sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
         }}
         open={isOpen}
      >
         <CircularProgress color="inherit" />
      </Backdrop>
   )
}
