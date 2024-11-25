import loadable, { DefaultComponent } from "@loadable/component";
import LoadSpinner from "../components/common/load-spinner/LoadSpinner";
import pMinDelay from "p-min-delay";
export const loadableOptions = { fallback: <LoadSpinner isBackdrop /> };

type LoadableOptions<T extends DefaultComponent<any>> = {
  loader: () => Promise<T>;
};

export const createLoadable = <T extends DefaultComponent<any>>(
  loader: () => Promise<T>,
  delay = 200,
  options = loadableOptions
) => loadable(() => pMinDelay(loader(), delay), options);

export const createLoadableComponent = (
  loader: () => Promise<DefaultComponent<any>>,
  delay = 200,
  options = loadableOptions
) => loadable(() => pMinDelay(loader(), delay), options);
