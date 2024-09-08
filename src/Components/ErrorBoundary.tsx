import React, { ErrorInfo, PropsWithChildren } from 'react';
import { Container, Typography, Button } from '@mui/material';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReload = () => {
    // Reload the page when the user clicks "Reload"
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container 
          maxWidth="sm" 
          style={{ textAlign: 'center', marginTop: '100px' }}
        >
          <Typography variant="h3" color="error" gutterBottom>
            Something went wrong.
          </Typography>
          <Typography variant="body1" gutterBottom>
            An unexpected error has occurred. Please try again.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={this.handleReload} 
            style={{ marginTop: '20px' }}
          >
            Reload Page
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
