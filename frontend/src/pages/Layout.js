import React from 'react'
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return(
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/wordquiz">Word Quiz</Link>
                    </li>
                    <li>
                        <Link to="/dataeditor">Data Editor</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout;