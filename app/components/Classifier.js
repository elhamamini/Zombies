import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTags } from '../redux/tags/thunks';
import axios from 'axios';

const Classifier = (props) => {
    const [keyIdx, setKeyIdx] = useState(0);
    const [replyIdx, setReplyIdx] = useState(0);
    const [done, setDone] = useState(false);
    const [data, setData] = useState({});
    const [output, setOutput] = useState({});
    const [trainingSet, setTraining] = useState([]);
    const dispatch = useDispatch();
    const whitelist = useSelector(state => state.tags.whitelist);


    const handleChange = (e, value) => {
        const updated = {...output};
        //if the value is already in the output, toggle it. if not, add it with value 1
        updated[value] = e.target.checked ? 1 : 0;
        //set output to include the updated values
        setOutput(updated);
    }

    const handleSubmit = () => {
        //TODO: post to /api/ml with trainingSet
    }

    const handleNext = (value) => {
        //put input and output values into object
        let pushed = trainingSet;
        pushed.push({
            input: value,
            output: output,
        });
        //update training set
        setTraining(pushed);
        //reset output values
        
        if (replyIdx === data[Object.keys(data)[keyIdx]].length - 1) {
            setKeyIdx(keyIdx + 1);
            setReplyIdx(0);
        } else {
            setReplyIdx(replyIdx + 1);
        }
        setOutput({});
    }

    useEffect(() => {
        console.log(output);

        if (keyIdx > 0 && keyIdx === Object.keys(data).length) {
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
                    data[Object.keys(data)[keyIdx]][replyIdx]
                }
            </div>
            <button
                onClick={handleNext}
                style={{padding: '2rem'}}
            >
                {
                    done ? 'ALL FINISHED' : 'Next'
                }
            </button>
            <div id="training-values">
                {
                    Object.keys(whitelist).map(key => 
                        <div key={key}>
                            <input
                                type="checkbox"
                                id={key}
                                name={key}
                                checked={output[key] ? true : false}
                                onChange={(e) => handleChange(e, key)}
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
