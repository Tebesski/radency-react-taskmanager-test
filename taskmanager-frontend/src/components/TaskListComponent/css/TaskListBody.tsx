import { Box, Stack } from "@mui/material"

type TaskListBodyProps = { children: React.ReactNode }

export default function TaskListBody({ children }: TaskListBodyProps) {
   return (
      <Box
         sx={{
            maxHeight: "500px",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
               display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
         }}
      >
         <Stack spacing={2}>{children}</Stack>
      </Box>
   )
}
