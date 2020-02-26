import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllConversations } from '../../redux/conversations/thunks';
import { MainContainer } from '../styled/Div';
import whitelist from '../../../whitelist';

function AllConvos(props) {
    const [page, setPage] = useState(0);
    const convosList = useSelector(state => state.allConversations);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllConversations(0));
    }, []);

    return (
        <MainContainer id="conversations-index">
            <ul>
                {
                    convosList.length ?
                    convosList.map(convo => <li key={convo.id}>{convo.id}</li>)
                    : ''
                }
            </ul>
            
        </MainContainer>
    );
};

export default AllConvos;