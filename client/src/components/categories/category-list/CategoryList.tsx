import React, { useEffect, useState } from "react";
import { useGetCategoriesWitPagination } from "../../../hooks/category";
import { List, ListItemButton, ListItemText } from "@mui/material";
import LoadSpinner from "../../common/load-spinner/LoadSpinner";
import BaseListItems from "../../common/base-list-items/BaseListItems";
import { CategoryAndLink } from "../../../types/category";
import ReactLink from "../../common/react-link/ReactLink";
import Grid from "@mui/material/Grid2";

const CategoryList = () => {
  const [categoriesAndLinks, setCategoriesAndLinks] = useState<
    CategoryAndLink[]
  >([]);
  const { data: categories, isLoading } = useGetCategoriesWitPagination({
    page: 1,
    limit: 50,
  });

  useEffect(() => {
    if (categories) {
      const links = categories.docs.map((category) => ({
        ...category,
        link: `products/category/${category.name}`,
      }));
      setCategoriesAndLinks(links);
    }
  }, [categories]);
  return (
    <List
      component={isLoading ? Grid : "div"}
      container
      sx={{ height: 1, justifyContent: "center", alignItems: "center" }}
    >
      {isLoading ? (
        <LoadSpinner />
      ) : (
        <>
          <ListItemButton component={ReactLink} to="/categories">
            <ListItemText primary="Categories" />
          </ListItemButton>
          <List>
            {categoriesAndLinks.map((category) => (
              <BaseListItems label={category.name} link={category.link} />
            ))}
          </List>
        </>
      )}
    </List>
  );
};

export default CategoryList;
