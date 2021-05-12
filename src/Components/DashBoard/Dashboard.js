import React, { useState, useEffect } from 'react';
//import { w3cwebsocket as W3CWebSocket } from "websocket";

// const clientState = new W3CWebSocket('ws://localhost:7778/dashboard');


const Dashboard = props => {

    const [ws, setWs] = useState(null);
    // const [msgToggle, setMsgToggle] = useState(false);


    useEffect(() => {
        console.log('useEffect Console!!')
        const wsClient = new WebSocket('ws://localhost:7778/dashboard');

        wsClient.onopen = () => {
            console.log('Websocket Client Connected !!');
            setWs(wsClient);
        };

        wsClient.onmessage = e => {
            const message = e.data;
            if(e.data === 'ping'){
                wsClient.send('pong');
            }
            console.log('e', message);
        };

        wsClient.onclose = () => {
            console.log('Websocket Client Closed !!');
        }

        wsClient.onerror = event => {
            console.log('Websocket Client Error !!', event.message);
        }

        return () => {
            wsClient.close()
        }
    }, []);


    // useEffect(() => {
    //     if (!ws) return;

    //     ws.onmessage = e => {
    //         console.log(e.data);
    //         const message = e.data;
    //         console.log('event', message);
    //     };
    // }, [msgToggle, ws]);


    // const pingEvent = () => {
    //     ws.send({
    //         text : 'ping'
    //     });
    //     // ws.send(JSON.stringify({
    //     //     text :'ping'
    //     // }))
    // };

    const sendEvent = (event) => {
        ws.send(event);
        // ws.send(JSON.stringify({
        //     event : event
        // }))
    };

    return (
        <div>
            <h1>DashBoard</h1>
            <button onClick={() => sendEvent('ping')}>SEND</button>
            <button onClick={() => sendEvent('get_count')}>SEND EVENT</button>
        </div>
    );
}

export default Dashboard;