import React from 'react'
import { ErrorState } from './ErrorState'

interface ErrorBoundaryProps {
    children: React.ReactNode
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
    state = { hasError: false }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getDerivedStateFromError(_error: string) {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <ErrorState message="Oops! The app has crashed, please try again later." fullH />;
        }
        return this.props.children
    }
}