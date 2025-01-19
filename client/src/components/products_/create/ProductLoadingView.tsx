import React from "react";
import GridLoaderCenter from "../../common/grid/grid-loader-center/GridLoaderCenter";
import BackdropLoading from "../../common/loaders/BackdropLoading";

const ProductLoadingView = () => {
  return <BackdropLoading message="Creating Product" />;
};

export default ProductLoadingView;
