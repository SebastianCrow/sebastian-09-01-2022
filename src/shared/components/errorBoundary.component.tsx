import React, { Component, ErrorInfo } from 'react';
import { Text } from '../../packages/ui/text/text.component';
import { Button } from '../../packages/ui/button/button.component';
import { FormattedMessage } from 'react-intl';
import styles from './errorBoundary.component.module.scss';

type ErrorBoundaryProps = unknown;

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catch exceptions coming from the children component and give user a way to recover by clicking the 'Try Again' button
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  private tryAgain() {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.page}>
          <div className={styles.container}>
            <div className={styles.message}>
              <Text>Something went wrong</Text>
            </div>
            <Button onClick={() => this.tryAgain()}>
              <FormattedMessage id="Try Again" />
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
