import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
};

export default class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null, errorInfo: null };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Keep console error for devtools, but also render UI fallback.
    // eslint-disable-next-line no-console
    console.error("AppErrorBoundary caught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;

    const message = this.state.error?.message || "Unknown error";
    const stack = this.state.error?.stack || "";
    const componentStack = this.state.errorInfo?.componentStack || "";

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-lg">
          <h1 className="text-xl sm:text-2xl font-semibold">Something crashed</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This is a demo app, but it should never show a blank screen. Copy the error below and send it to me—I’ll fix it.
          </p>

          <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4">
            <p className="text-sm font-medium">Error</p>
            <pre className="mt-2 whitespace-pre-wrap break-words text-xs leading-relaxed text-foreground/90">
{message}
{"\n\n"}
{stack}
{"\n\n"}
{componentStack}
            </pre>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <button
              onClick={this.handleReload}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              type="button"
            >
              Reload
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
    );
  }
}

