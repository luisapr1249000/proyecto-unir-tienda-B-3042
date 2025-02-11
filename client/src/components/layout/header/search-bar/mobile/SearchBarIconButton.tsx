import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";

const SearchBarIconButton = ({
  handleDrawerClick,
}: {
  handleDrawerClick: () => void;
}) => {
  return (
    <Tooltip title="Search">
      <IconButton onClick={handleDrawerClick}>
        <SearchIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
};

export default SearchBarIconButton;
