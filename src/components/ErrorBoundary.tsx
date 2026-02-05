import {
  Component,
  type ErrorInfo,
  type PropsWithChildren,
  type ReactNode,
} from "react";

type Props = {
  fallback?: ReactNode;
  ignore?: true;
};

type State = {
  error: Error | null;
};

export default class ErrorBoundary extends Component<
  PropsWithChildren<Props>,
  State
> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.ignore) return;

    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.error) return this.props.fallback;

    return this.props.children;
  }
}
