import { Box, Button, Card, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

import AnimationContainerWithFramer from "../animation";

const ToDoCard = ({
  title,
  notes,
  status,
  id,
}: {
  title: string;
  notes: string;
  status: string;
  id: string;
}) => {
  return (
    <Link
      to="/tasks/$id"
      params={{ id: id }}
      style={{ textDecoration: "none", width: "100%" }}
    >
      <AnimationContainerWithFramer delay={0.3}>
        <Card
          elevation={3}
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            borderRadius: "8px",
            width: "100%",
            backgroundColor: "#fff",
            color: "#000",
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
            borderColor: status == "needsAction" ? "error" : "InfoBackground",
            borderWidth: 0.5,
            transition: "all 0.3s linear",
            "&:hover": {
              boxShadow:
                "0 4px 8px rgba(0, 0, 0, 0.16), 0 4px 8px rgba(0, 0, 0, 0.23)",
              transform: "scale(0.98)",
            },
          }}
        >
          <Box
            padding={2}
            sx={{
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {notes}
            </Typography>
          </Box>

          <Box
            padding={2}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="caption"
              color={status == "needsAction" ? "error" : "success"}
            >
              {status == "needsAction" ? "Needs Action" : "Completed"}
            </Typography>
            <Button
              variant="contained"
              size="small"
              disabled={status == "needsAction"}
              color={status == "completed" ? "success" : "primary"}
              sx={{
                textTransform: "capitalize",
                borderRadius: "20px",
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
