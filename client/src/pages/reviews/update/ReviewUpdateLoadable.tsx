import { createLoadableComponent } from "../../../utils/utils.loadable";

const ReviewUpdateLoadable = createLoadableComponent(
  () => import("./ReviewUpdate")
);

export default ReviewUpdateLoadable;
