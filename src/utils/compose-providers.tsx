import type { ComponentType, PropsWithChildren } from "react";

export default function composeProviders(
  ...providers: Array<ComponentType<PropsWithChildren>>
) {
  return providers.reduce(
    (AccumulatedProviders, CurrentProvider) => (props) => (
      <AccumulatedProviders>
        <CurrentProvider {...props} />
      </AccumulatedProviders>
    ),
    (({ children }) => <>{children}</>) as ComponentType<PropsWithChildren>,
  );
}
