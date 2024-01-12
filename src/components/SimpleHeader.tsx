import { List, ListItemText, ListItemButton } from "@mui/material";
import { NavLink } from "react-router-dom";



const SimpleHeader: React.FC = () => {
  const navigationData = [
    {
      name: "JSON Checker",
      path: "/json-checker",
    },
    {
      name: "SVG Viewer",
      path: "/svg-viewer",
    },
  ];
  return (
    <div>
      <List sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        {navigationData.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            style={{ textDecoration: "none" }}
            children={({ isActive }) => (
              <>
                <ListItemButton
                  selected={isActive}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </>
            )}
          />
        ))}
      </List>
    </div>
  );
};

export default SimpleHeader;
