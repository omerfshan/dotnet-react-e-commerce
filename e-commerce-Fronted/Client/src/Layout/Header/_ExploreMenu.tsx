import { Box, Chip, Collapse } from "@mui/material";
import { NavLink } from "react-router-dom";
import type { ICatagory } from "../../Model/ICatagory";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type Props = {
  open: boolean;
  onClose: () => void;
  categories: ICatagory[];
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
      <Box sx={{ display: { xs: "block", md: "none" }, px: 2, pb: 2 }}>
        <Box
          sx={{
            border: "1px solid #E2E8F0",
            borderRadius: 3,
            bgcolor: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}
        >
          {categories.map((c, idx) => (
            <NavLink
              key={c.id || c.label}
              to={`/category/${c.id}`}
              onClick={onClose}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  py: 1.4,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "background 0.15s",
                  "&:hover": { bgcolor: "#F8FAFC" },
                  "&:active": { bgcolor: "#F1F5F9" },
                  ...(idx !== 0 && { borderTop: "1px solid #F1F5F9" }),
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>{c.label}</span>
                  {c.isNew && (
                    <Chip
                      label="Yeni"
                      size="small"
                      sx={{
                        bgcolor: newBadge,
                        color: "#fff",
                        height: 20,
                        fontSize: 11,
                        fontWeight: 800,
                      }}
                    />
                  )}
                </Box>
                <ChevronRightIcon sx={{ color: "#94A3B8", fontSize: 20 }} />
              </Box>
            </NavLink>
          ))}
        </Box>
      </Box>
    </Collapse>
  );
}
