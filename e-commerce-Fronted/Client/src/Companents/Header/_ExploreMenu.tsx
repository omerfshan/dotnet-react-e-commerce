import { Box, Chip, Collapse } from "@mui/material";
import type { NavItem } from "./types";

type Props = {
  open: boolean;
  onClose: () => void;
  categories: NavItem[];
  newBadge: string;
};

export default function ExploreMenu({
  open,
  onClose,
  categories,
  newBadge,
}: Props) {
  return (
    <Collapse in={open} timeout={180} unmountOnExit>
      <Box sx={{ display: { xs: "block", md: "none" }, px: 1.5, pb: 1.2 }}>
        <Box sx={{ border: "1px solid #E5E7EB", borderRadius: 2 }}>
          {categories.map((c, idx) => (
            <Box
              key={c.label}
              onClick={onClose}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: 1.5,
                py: 1.1,
                fontWeight: 800,
                ...(idx !== 0 && { borderTop: "1px solid #F1F5F9" }),
              }}
            >
              {c.label}
              {c.isNew && (
                <Chip
                  label="Yeni"
                  size="small"
                  sx={{ bgcolor: newBadge, color: "#fff" }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Collapse>
  );
}
