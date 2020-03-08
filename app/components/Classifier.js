import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { fetchTags } from '../redux/tags/thunks';

const Classifier = (props) => {
    const [keyIdx, setKeyIdx] = useState(0);
    const [done, setDone] = useState(false);
    const [data, setData] = useState({});
    const [outputArr, setOutput] = useState([]);
    const [allData, setAll] = useState({});
    const dispatch = useDispatch();
    const whitelist = useSelector(state => state.tags.whitelist);


    const handleChange = (value) => {
        let nextState = Array.from(outputArr);
        nextState.push(value);
        setOutput(nextState);
    }

    const handleSubmit = async() => {
        //post to /api/ml with trainingSet
        await axios.post('/api/ml', { classified: allData });
    }

    const handleNext = () => {

        // {
        //     1: ['big str', ['val1', 'val2']],
        //     2: ...
        // }

        const docArr = [data[Object.keys(data)[keyIdx]][0]];
        docArr.push(outputArr);
        const updatedData = {...allData};
        updatedData[`${keyIdx}`] = docArr;
        setAll(updatedData);
        setKeyIdx(keyIdx + 1);
        setOutput([]);
    }

    useEffect(() => {
        console.log('current output values', outputArr);
        console.log('trainingSet', allData);

        if (keyIdx > 0 && keyIdx >= Object.keys(data).length) {
            setDone(true);
        }

        const fetchData = async() => {
            let fetched = (await axios.get('/api/ml')).data;
            setData(fetched);
        }
        if (!Object.keys(whitelist).length) {
            dispatch(fetchTags());
        }
        if (Object.keys(data).length === 0) {
            fetchData();
        }

    });

    if (!Object.keys(whitelist).length || !Object.keys(data).length) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    return (
        <div id="ml">
            <div id="training-string">
                {
                    data[Object.keys(data)[keyIdx]][0]
                }
            </div>
            <button
                onClick={handleNext}
                style={{padding: '2rem'}}
                disabled={done}
            >
                {
                    done ? 'ALL FINISHED' : 'Next'
                }
            </button>
            <div
                id="training-values"
                style={{
                    fontSize: '1.5rem',
                    display: 'flex',
                    flexFlow: 'row wrap',
                }}
            >
                {
                    Object.keys(whitelist).map(key => 
                        <div key={key}>
                            <input
                                type="checkbox"
                                id={key}
                                name={key}
                                style={{ margin: '1rem '}}
                                checked={outputArr.includes(key)}
                                onChange={() => handleChange(key)}
                            />
                            <label htmlFor={key}>{key}</label>
                        </div>
                    )
                }
            </div>
            <button
                onClick={handleSubmit}
                style={{background: 'red', padding: '2rem'}}
            >
                Submit All
            </button>
        </div>
    )
};

export default Classifier;
