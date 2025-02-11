import loadable, { DefaultComponent } from "@loadable/component";
import pMinDelay from "p-min-delay";
import BackdropLoading from "../components/common/loaders/BackdropLoading";

export const loadableOptions = { fallback: <BackdropLoading /> };

export const createLoadableComponent = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loader: () => Promise<DefaultComponent<any>>,
  delay = 200,
  options = loadableOptions
) => loadable(() => pMinDelay(loader(), delay), options);
