import { Component, ErrorInfo, ReactNode } from 'react';

class ErrorBoundary extends Component<{ children: ReactNode }> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    const { error } = this.state;

    if (error) return <h1>Error: {error.message}</h1>;
    else return this.props.children;
  }
}

export default ErrorBoundary;
