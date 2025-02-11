import { createLoadableComponent } from "../../../utils/utils.loadable";

const ReviewCreateLoadable = createLoadableComponent(
  () => import("./ReviewCreate")
);

export default ReviewCreateLoadable;
