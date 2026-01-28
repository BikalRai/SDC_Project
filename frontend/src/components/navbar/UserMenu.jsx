import { logoutUser } from "@/slices/auth.slice";
import { MenuItem, MenuList, Paper, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Paper>
          <MenuList>
            <MenuItem onClick={() => navigate("/user/dashboard")}>
              My account
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Paper>
      </Stack>
    </div>
  );
};

export default UserMenu;
