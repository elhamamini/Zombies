// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchAllConversations } from '../../redux/conversations/thunks';
// import * as Container from '../styled/Div';
// import * as Font from '../styled/Font';
// import whitelist from '../../../whitelist';

// function AllConvos(props) {
//   const [page, setPage] = useState(0);
//   const convosList = useSelector(state => state.allConversations);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchAllConversations(0));
//   }, []);

//   return (
//     <Container.Paper id="conversations-index">
//       <Font.Header>Learn. Discuss. Get Help.</Font.Header>
//       <Font.Paragraph>
//         LearnDot forums are a great way to get help from your peers.
//       </Font.Paragraph>
//       <Font.Title>Popular Topics</Font.Title>
//       <ul>
//         {convosList.length
//           ? convosList.map(convo => <li key={convo.id}>{convo.id}</li>)
//           : ''}
//       </ul>
//     </Container.Paper>
//   );
// }

// export default AllConvos;
