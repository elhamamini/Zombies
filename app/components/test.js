import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRepos } from '../redux/repository/thunks';

class Test extends Component {
  componentDidMount() {
    this.props.getRepos();
    // this.props.getActiveUser();
  }
  render() {
    console.log('activeUser', this.props.activeUser);
    console.log('reposssss', this.props.reposetories);
    return <div>hiiiii</div>;
  }
}
const mapStateToProps = ({ reposetories, activeUser }) => ({
  reposetories,
  activeUser,
});
const mapDispatchToProps = dispatch => {
  return {
    getRepos: () => dispatch(getRepos()),
    getActiveUser: () => dispatch(getActiveUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Test);
