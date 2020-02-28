import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRepos } from '../redux/repository/thunks';

class Test extends Component {
  componentDidMount() {
    this.props.getRepos();
  }
  render() {
    console.log('activeUser', this.props.user);
    console.log('reposssss', this.props.repositories);
    return <div>hiiiii</div>;
  }
}
const mapStateToProps = ({ repositories, user }) => ({
  repositories,
  user,
});
const mapDispatchToProps = dispatch => {
  return {
    getRepos: () => dispatch(getRepos()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Test);
