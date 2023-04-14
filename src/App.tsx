import './App.scss'
import React from 'react'
import {RouterProvider} from "react-router-dom";
import {router} from "./Router";
import {Provider} from "react-redux";
import store from "./store";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </div>
    )
}

export default App
