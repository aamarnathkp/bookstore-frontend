import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import classes from './Dashboard.module.css';

const LanguageGraph = props => {

    const data = [
        {
            name: 'English',
            Authors: 140,
            Books: 540,
            // amt: 2400,
        },
        {
            name: 'Hindi',
            Authors: 29,
            Books: 189,
            // amt: 2210,
        },
        {
            name: 'Malayalam',
            Authors: 55,
            Books: 980,
            // amt: 2290,
        },
        {
            name: 'Tamil',
            Authors: 19,
            Books: 70,
            // amt: 2000,
        },
        {
            name: 'Kannada',
            Authors: 7,
            Books: 52,
            // amt: 2181,
        }
    ];






    return (
        <div className={classes.PieChartAuthors}>
            <div className={classes.PieChartAuthorsTitle}>LANGUAGE</div>
            <div className={classes.AuthorGraph}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="Authors" fill="#8884d8" />
                        <Bar yAxisId="right" dataKey="Books" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default LanguageGraph;