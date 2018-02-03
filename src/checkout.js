import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'bluebird';
import request from 'request-promise';
import Button from './Button.jsx'

"use strict";

{
    // Helper function for getting mandatory attributes from element.
    const getAttribute = (node, name, error) => {
        const attribute = node.getAttribute(name);
        if (attribute === null || attribute === undefined) {
            throw new Error(error);
        }
        return attribute
    };

    // Find the script and the surrounding form.
    const {self, form} = (() => {
        const scripts = document.getElementsByTagName('script');
        const self = scripts[scripts.length - 1];
        const form = self.parentElement;
        if (form && form.tagName !== 'FORM') {
            throw new Error("The warp checkout script must be placed within a form.");
        }
        return {self, form};
    })();

    // Add div for button root.
    const buttonRoot = document.createElement('div');
    form.appendChild(buttonRoot);

    const amount = parseInt(getAttribute(self, 'data-amount', 'Attribute \'data-amount\' must be set.'));
    const account_id = getAttribute(self, 'data-account-id', 'Attribute \'data-account-id\' must be set.');

    // Render button to button root.
    ReactDOM.render(<Button payment={{destination: account_id, amount: amount}}/>, buttonRoot);
}