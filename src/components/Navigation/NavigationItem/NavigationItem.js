import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>
        {props.children}    </NavLink> 
    </li>
); 
// keep in mind the nav link automatically appends or attatches a class named active.
// css modules will take our class names and convert them into unique class names.
// therefore when we set up active here in css, it won't come out as active.
// active class attatched at runtime by nav link will not match our active class.
// => you can add activeCLassName here, then activeClassName as our css modules transformation spits it out.
export default navigationItem;