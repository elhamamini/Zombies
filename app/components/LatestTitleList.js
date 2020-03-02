import React from 'react';
import { connect } from 'react-redux';
import { fetchAllConversations } from '../redux/conversations/thunks';
class LatestTitleList extends React.Component {
  componentDidMount() {
    this.props.getConversations(0);
  }
  render() {
    var day = new Date();
    // var nextDay = new Date(day);
    // const today = nextDay.setDate(day.getDate() + 1).toString('dd-mm-yyyy');
    if (this.props.allConversations.length) {
      console.log(this.props.allConversations[0]);
    }

    return <div>hii</div>;
  }
}
const mapStateToProps = ({ allConversations }) => ({ allConversations });
const mapDispatchToProps = dispatch => {
  return {
    getConversations: p => dispatch(fetchAllConversations(p)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LatestTitleList);
