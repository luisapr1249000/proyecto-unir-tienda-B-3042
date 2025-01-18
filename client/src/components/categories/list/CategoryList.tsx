import React, { useEffect, useState } from "react";
import { useGetCategoriesWithPagination } from "../../../hooks/categories.hooks";
import { ListItemProps } from "../../../types/abstract";
import { Collapse, ListItem } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { LinkText } from "../../common/react-link/Link";

const CategoryList = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useGetCategoriesWithPagination({ limit: 10 });
  const [formattedCategories, setFormattedCategories] = useState<
    ListItemProps[]
  >([]);

  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandClick = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    if (categories) {
      const categoryList = categories.docs.map((category) => ({
        label: category.name,
        link: `/category/${category._id}`,
      }));
      setFormattedCategories([
        ...categoryList,
        { link: "categories", label: "See all" },
      ]);
    }
  }, [categories]);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  if (!categories) return <div>Not Found</div>;

  return (
    <List component="div" disablePadding>
      <ListItem disableGutters disablePadding divider={!isExpanded}>
        <ListItemButton onClick={handleExpandClick}>
          <ListItemIcon>
            <LocalMallIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={isExpanded}>
        <List component="div" disablePadding>
          {formattedCategories.map((category) => (
            <ListItem
              key={category.label}
              component={LinkText}
              to={category.link}
              disableGutters
              disablePadding
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary={category.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default CategoryList;
