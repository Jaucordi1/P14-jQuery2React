import './App.scss'
import React from 'react'
import {RouterProvider} from "react-router-dom";
import {router} from "./Router";

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    )
}

export default App
