import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    this.setState({ info })
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', color: '#fca5a5', fontFamily: 'monospace' }}>
          <h2>Error</h2>
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>
            {this.state.error?.toString()}
          </pre>
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
            {this.state.info?.componentStack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
