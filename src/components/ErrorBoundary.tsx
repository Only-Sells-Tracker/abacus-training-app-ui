// import React, { Component, ErrorInfo, ReactNode } from 'react';

// interface Props {
//   children: ReactNode;
// }

// interface State {
//   hasError: boolean;
// }

// class ErrorBoundary extends Component<Props, State> {
//   public state: State = {
//     hasError: false,
//   };

//   public static getDerivedStateFromError(_: Error): State {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true };
//   }

//   public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//     // You can also log the error to an error reporting service
//     console.error('Uncaught error:', error, errorInfo);
//   }

//   public render() {
//     if (this.state.hasError) {
//       return (
//         <div className="h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white flex flex-col items-center justify-center text-center p-4">
//           <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
//           <p className="text-lg mb-8">An unexpected error occurred. Please try refreshing the page.</p>
//           <button onClick={() => (window.location.href = '/')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
//             Go to Homepage
//           </button>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;

// components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error('Error boundary caught:', error, errorInfo);

        // Optional: Send to error reporting service
        // logErrorToService(error, errorInfo);
    }

    handleReset = () => {
        // Clear potentially corrupted data
        localStorage.clear();
        this.setState({ hasError: false, error: undefined });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h1>Something went wrong</h1>
                    <p>We've encountered an unexpected error.</p>
                    <details style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
                        {this.state.error?.toString()}
                    </details>
                    <button
                        onClick={this.handleReset}
                        style={{ marginTop: '20px', padding: '10px 20px' }}
                    >
                        Reset Application
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
