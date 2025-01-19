import React, { useEffect } from "react";
import {
  BaseLayOut,
  ToggleableSideMenu,
} from "../layout/base-layout/BaseLayout";
import Header from "../layout/header/header/Header";
import { List, ListItem, ListItemText } from "@mui/material";
import { PriceSliderContainer } from "../common/sliders/PriceSlider";
import {
  useGetProductsByCategoryWithPagination,
  useGetProductsWithPagination,
} from "../../hooks/products.hooks";
import { useLocation } from "react-router-dom";

const ProductLayout = () => {
  const { pathname } = useLocation();
  const isCategory = pathname.includes("products/categories");
  const [isOpenSideMenu, setIsOpenSideMenu] = React.useState(true);
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  const handleOpenSideMenu = () => setIsOpenSideMenu((prev) => !prev);
  const handleOpenDrawer = () => setIsOpenDrawer((prev) => !prev);

  const { data: products } = isCategory
    ? useGetProductsByCategoryWithPagination({
        categoryId: pathname.split("/").pop() ?? "",
        limit: 10,
        sort: "-price",
      })
    : useGetProductsWithPagination({
        limit: 10,
        sort: "-price",
      });
  console.log("products", products);
  console.log("top", products?.docs[0].price);

  return (
    <>
      <Header handleOpenDrawer={handleOpenDrawer} />
      <BaseLayOut>
        <ToggleableSideMenu
          handleOpen={handleOpenSideMenu}
          isOpen={isOpenSideMenu}
          isDrawerOpen={isOpenDrawer}
          handleDrawerOpen={handleOpenDrawer}
        >
          <List>
            <ListItem divider sx={{ display: "flex", flexDirection: "column" }}>
              <ListItemText primary="Price" />
              <PriceSliderContainer
                link={pathname}
                max={products?.docs[0].price ?? 500}
                min={0}
                marks={[
                  {
                    value: 0,
                    label: "0$",
                  },
                  {
                    value: products?.docs[0].price ?? 500,
                    label: products?.docs[0].price ?? 500,
                  },
                ]}
              />
            </ListItem>
          </List>
        </ToggleableSideMenu>
      </BaseLayOut>
    </>
  );
};

export default ProductLayout;
