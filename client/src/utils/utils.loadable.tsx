import loadable, { DefaultComponent } from "@loadable/component";
import LoadSpinner from "../components/common/load-spinner/LoadSpinner";
import pMinDelay from "p-min-delay";

export const loadableOptions = { fallback: <LoadSpinner isBackdrop /> };

export const createLoadableComponent = (
  loader: () => Promise<DefaultComponent<any>>,
  delay = 200,
  options = loadableOptions
) => loadable(() => pMinDelay(loader(), delay), options);
