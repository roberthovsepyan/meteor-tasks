import React from 'react';
import {Link} from 'react-router-dom';

export const NotFound = () => (
    <div className="notFound">
        <h2>Sorry, there is no such page</h2>
        <Link to="/">Head back Home!</Link>
    </div>
);