import { Accounts } from 'meteor/accounts-base';

import React from 'react';
import {Redirect} from 'react-router-dom';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
});
