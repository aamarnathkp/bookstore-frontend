import React, { useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { DataGrid } from '@material-ui/data-grid';

import classes from './Quiz.module.css';
import QuizModal from '../../../UI/Modal/QuizFormModal';

const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Quiz name', width: 200 },
    {
        field: 'duration',
        headerName: 'Duration',
        type: 'number',
        width: 200,
    },
    {
        field: 'questions',
        headerName: 'Questions Count',
        type: 'number',
        width: 200,
    },
];

const rows = [
    { id: 1, name: 'Aptitude', duration: 20, questions: 10 },
    { id: 2, name: 'Aptitude 2', duration: 20, questions: 2 },
    { id: 3, name: 'C++', duration: 30, questions: 4 },
    { id: 4, name: 'Language', duration: 50, questions: 5 },
    { id: 5, name: 'Web Technology', duration: 60, questions: 6 },
    { id: 6, name: 'SIP', duration: 90, questions: 2 },
    { id: 7, name: 'API', duration: 10, questions: 1 },
    { id: 8, name: 'GIT', duration: 30, questions: 5 },
    { id: 9, name: 'Jenkins', duration: 70, questions: 7 },
    { id: 10, name: 'ReactJS', duration: 80, questions: 8 },
];


const Quiz = props => {

    const [quizModalStatus, setQuizModalStatus] = useState(false);



    // let allQuiz = null;
    // allQuiz = quiz.map(({ name, duration }, index) => {
    //     return (
    //         <div className={classes.Item} key={index}>
    //             <strong> Quiz name : {name},  Duration :  {duration}</strong>
    //         </div>
    //     )
    // })


    let quizModal = null;
    console.log(quizModalStatus);
    if (quizModalStatus) {
        quizModal = <QuizModal open={quizModalStatus}

            modalClose={setQuizModalStatus} />
    }

    const onAddButtonClick = () => {
        setQuizModalStatus(true);
    }

    const onRowClick = (event) => {
        console.log(event);
        setQuizModalStatus(true);
    }

    return (
        <>
            {quizModal}
            <div className={classes.Menu}>
                <div className={classes.AddQuiz} onClick={onAddButtonClick}>
                    <AddCircleIcon />
                </div>
            </div>
            <div className={classes.Container}>
                {/* {allQuiz} */}

                <div style={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        onCellDoubleClick={(event) => onRowClick(event)}
                        pageSize={8}
                         />
                </div>


            </div>
        </>
    );
}

export default Quiz;