import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { exampleAjax } from './actions';

class App extends Component {
  handleClick = () => {
    this.props.actions.exampleAjax();
  };

  render() {
    const { apis, user, loading } = this.props;

    return (
      <div className="App">
        <button onClick={this.handleClick}>click</button>
        {loading && <p>ローディング中</p>}
        <hr />
        <div>
          <pre>{JSON.stringify(apis, null, '\t')}</pre>
        </div>
        <div>
          <pre>{JSON.stringify(user, null, '\t')}</pre>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ github }) => ({
  apis: github.apis,
  user: github.user,
  loading: github.loading
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ exampleAjax }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
