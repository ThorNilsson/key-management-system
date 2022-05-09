import React from 'react';
import EventsView from '../view/EventsView';
import RegisterView from '../view/RegisterView';

export default function RegisterPresenter(props){


    return(
        <RegisterView></RegisterView>
    )
}


function isLoggedIn() {
    if (this.user) {
        return true;
    } else {
        return false;
    }
}

