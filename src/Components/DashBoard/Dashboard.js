import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import classes from './Dashboard.module.css';
import Language from './LanguageGraph';

const Dashboard = props => {

    // const [ws, setWs] = useState(null);
    // const [msgToggle, setMsgToggle] = useState(false);


    // useEffect(() => {
    //     console.log('useEffect Console!!')
    //     const wsClient = new WebSocket('ws://localhost:7778/dashboard');

    //     wsClient.onopen = () => {
    //         console.log('Websocket Client Connected !!');
    //         setWs(wsClient);
    //     };

    //     wsClient.onmessage = e => {
    //         const message = e.data;
    //         if (e.data === 'ping') {
    //             wsClient.send('pong');
    //         }
    //         console.log('e', message);
    //     };

    //     wsClient.onclose = () => {
    //         console.log('Websocket Client Closed !!');
    //     }

    //     wsClient.onerror = event => {
    //         console.log('Websocket Client Error !!', event.message);
    //     }

    //     return () => {
    //         wsClient.close()
    //     }
    // }, []);




    // const sendEvent = (event) => {
    //     ws.send(event);
    // };


    const data = [
        { name: 'Fiction', value: 400 },
        { name: 'Novel', value: 300 },
        { name: 'Thriller', value: 300 },
        { name: 'Narrative', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            {/* <h1>DashBoard</h1>
            <button onClick={() => sendEvent('ping')}>SEND</button>
            <button onClick={() => sendEvent('get_count')}>SEND EVENT</button> */}
            <Language />
            <div className={classes.PieChartBooks}>
                <div className={classes.PieChartTitle}>BOOKS</div>
                <div className={classes.PieChartGraph}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;