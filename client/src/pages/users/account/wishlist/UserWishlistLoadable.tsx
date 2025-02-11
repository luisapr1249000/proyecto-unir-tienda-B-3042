import { createLoadableComponent } from "../../../../utils/utils.loadable";

const UserWishlistLoadable = createLoadableComponent(
  () => import("./UserWishlist")
);

export default UserWishlistLoadable;
