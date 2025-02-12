import { Box, Button, Card, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

import AnimationContainerWithFramer from "../animation";

const ToDoCard = ({
  title,
  notes,
  status,
  id,
  index,
}: {
  title: string;
  notes: string;
  status: string;
  id: string;
  index: number;
}) => {
  return (
    <Link
      to="/tasks/$id"
      params={{ id: id }}
      style={{ textDecoration: "none", width: "100%" }}
    >
      <AnimationContainerWithFramer delay={index * 0.03}>
        <Card
          elevation={3}
          variant="outlined"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "8px",
            width: "100%",
            backgroundColor: status == "needsAction" ? "" : "cadetblue",
            color: status == "needsAction" ? "" : "white",
          }}
        >
          <Box
            padding={2}
            sx={{
              width: "75%",
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {title}
            </Typography>
            <Typography
              variant="subtitle2"
              color="disabled"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              marginTop={1}
            >
              {notes}
            </Typography>
          </Box>

          <Box flexGrow={1} display="flex" justifyContent="end">
            <Button
              variant="contained"
              size="small"
              disabled={status == "needsAction"}
              color={status == "completed" ? "success" : "primary"}
              sx={{
                color: "white",
                marginRight: 2,
                textTransform: "capitalize",
              }}
            >
              {status == "needsAction"
                ? "Todo"
                : status == "completed"
                  ? "Completed"
                  : "Processing"}
            </Button>
          </Box>
        </Card>
      </AnimationContainerWithFramer>
    </Link>
  );
};

export default ToDoCard;
