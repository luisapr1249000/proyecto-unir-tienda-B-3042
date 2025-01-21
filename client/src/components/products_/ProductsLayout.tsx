import {
  BaseLayOut,
  ToggleableSideMenu,
} from "../layout/base-layout/BaseLayout";
import Header from "../layout/header/header/Header";
import { List, ListItem, ListItemText } from "@mui/material";
import { PriceSliderContainer } from "../common/sliders/PriceSlider";
import {
  useGetProductsByCategoryWithPagination,
  useGetProductsWithPagination_,
} from "../../hooks/products.hooks";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useGetCategoryByName } from "../../hooks/categories.hooks";

const ProductLayout = () => {
  const { pathname } = useLocation();
  const isCategory = pathname.includes("/products/categories/");
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(true);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const handleOpenSideMenu = () => setIsOpenSideMenu((prev) => !prev);
  const handleOpenDrawer = () => setIsOpenDrawer((prev) => !prev);

  const { data: category } = useGetCategoryByName({
    categoryName: pathname.split("/").pop() ?? "",
  });

  const { data: products } = isCategory
    ? useGetProductsByCategoryWithPagination({
        categoryId: category?._id ?? "",
        limit: 10,
        sort: "-price",
        enabled: !!category,
      })
    : useGetProductsWithPagination_({
        limit: 10,
        sort: "-finalPrice",
      });

  console.log("isCategory", isCategory);
  console.log("pathname", pathname);
  console.log("products", products);
  console.log("top", products?.docs[0].finalPrice);
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
                max={products?.docs[0].finalPrice ?? 500}
                min={0}
                marks={[
                  {
                    value: 0,
                    label: "0$",
                  },
                  {
                    value: products?.docs[0].finalPrice ?? 500,
                    label: products?.docs[0].finalPrice ?? 500,
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
