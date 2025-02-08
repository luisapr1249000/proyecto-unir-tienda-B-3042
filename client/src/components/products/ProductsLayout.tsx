import { BaseLayOut } from "../layout/base-layout/BaseLayout";
import Header from "../layout/header/header/Header";
import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useGetProductsWithPagination } from "../../hooks/products.hooks";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetCategoryByName } from "../../hooks/categories.hooks";
import ToggleableSideMenu from "../common/drawers/ToggleableSideMenu";
import ToggleableDrawerList from "../common/drawers/lists/ToggleableDrawerList";
import MobileToggleableDrawer from "../common/drawers/MobileToggleableDrawer";
import PriceSlider from "../common/sliders/PriceSlider";
import { Mark } from "@mui/material/Slider/useSlider.types";
import { createMenuItems } from "../../utils/menu.utils";

export const ProductListOption = ({
  isSideMenuOpen,
  onCloseDrawer,
}: {
  isSideMenuOpen: boolean;
  onCloseDrawer?: () => void;
}) => {
  return (
    <List>
      <ToggleableDrawerList
        isSideMenuOpen={isSideMenuOpen}
        listItem={createMenuItems()}
        onCloseDrawer={onCloseDrawer}
      />
    </List>
  );
};

export const PriceSliderContainer = ({ marks }: { marks: Mark[] }) => {
  const [searchParams] = useSearchParams();
  const [queryLink, setQueryLink] = useState("");
  useEffect(() => {
    if (searchParams.get("query")) {
      const queryValue = searchParams.get("query") || "";

      setQueryLink(`/products/search?query=${queryValue}`);
    }
  }, []);
  return (
    <Card sx={{ flexGrow: 1 }} elevation={4}>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          Price Range
        </Typography>
      </CardContent>
      <Divider />
      <CardContent sx={{ p: 3 }}>
        <PriceSlider
          link={queryLink}
          marks={marks}
          min={marks[0].value}
          max={marks[1].value}
        />
      </CardContent>
    </Card>
  );
};

const ProductLayout = () => {
  const { pathname } = useLocation();
  const isCategory = pathname.includes("/products/categories/");
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(true);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [marks, setMarks] = useState<Mark[]>([
    { value: 1, label: "1$" },
    { value: 500, label: "500$" },
  ]);

  const handleOpenSideMenu = () => setIsOpenSideMenu((prev) => !prev);
  const handleOpenDrawer = () => setIsOpenDrawer((prev) => !prev);

  const { data: category } = useGetCategoryByName({
    categoryName: pathname.split("/").pop() ?? "",
  });

  const { data: products } = useGetProductsWithPagination(
    isCategory
      ? {
          categoryId: category?._id ?? "",
          limit: 10,
          sort: "-price",
          enabled: !!category,
        }
      : {
          limit: 10,
          sort: "-finalPrice",
        }
  );

  console.log("products", products);
  console.log("top", products?.docs[0].finalPrice);
  useEffect(() => {
    setMarks([
      { value: 0, label: "0$" },
      {
        value: products?.docs[0].finalPrice,
        label: `${products?.docs[0].finalPrice}$`,
      },
    ]);
  }, [products]);
  return (
    <>
      <Header handleOpenDrawer={handleOpenDrawer} />
      <BaseLayOut>
        <ToggleableSideMenu
          onClick={handleOpenSideMenu}
          isSideMenuOpen={isOpenSideMenu}
          drawerWidth={300}
        >
          <ProductListOption isSideMenuOpen={isOpenSideMenu} />

          <Divider />
          <ListItem
            sx={{ py: 2, display: isOpenSideMenu ? "block" : "none" }}
            divider
          >
            <PriceSliderContainer marks={marks} />
          </ListItem>
        </ToggleableSideMenu>

        <MobileToggleableDrawer
          onCloseDrawer={handleOpenDrawer}
          isOpen={isOpenDrawer}
        >
          <ProductListOption
            onCloseDrawer={handleOpenDrawer}
            isSideMenuOpen={isOpenSideMenu}
          />
          <ListItem sx={{ py: 5 }} divider>
            <PriceSliderContainer marks={marks} />
          </ListItem>
        </MobileToggleableDrawer>
      </BaseLayOut>
    </>
  );
};

export default ProductLayout;
