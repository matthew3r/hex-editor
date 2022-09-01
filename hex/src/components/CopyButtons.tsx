import React, { useState } from 'react';

/*
    This components contains the buttons to copy the hex or raw text to the clipboard
 */
export default function CopyButtons() {
    /*
        This contains the informations for the feedback span which is shown for the user if the copy was 
        successful or not
    */
    const [ result, setResult ] = useState({
        cls: 'copyresult copyhide',
        text: ''
    });

    const handleOnClick = (event: any) => {
        let type = event.target.getAttribute('data-copytype'), // Get which type to copy
            block = document.getElementById(type) || null; // Get the container which contains that information

        if (block === null) { return; }

        // Get the highlighted blocks
        let highlighted = block.getElementsByClassName('highlight'),
            result = '',
            joinstr = type === 'hexblock' ? ' ' : '';
        
        // Iterate through the elements and join them in a new string, with hex data there is space between them.
        for (let i = 0; i < highlighted.length; i++) {
            result += highlighted[i].innerHTML + joinstr;
        }

        /* 
            I use the async Clipboard API because this looks the most easiest to implement and to use.
            After a successful or unsuccessful copy I show a text after the buttons to give a feedback to the users and depending on the result I hide it after 3/5 seconds
        */
        navigator.clipboard.writeText(result).then(function() {
            setResult({
                cls: 'copyresult',
                text: 'Copy to clipboard was successful!'
            });

            setTimeout(() => { setResult({ cls: 'copyresult copyhide', text: '' })}, 3000);
        }, function(err) {
            setResult({
                cls: 'copyresult copyerr',
                text: 'Could not copy text!'
            });

            setTimeout(() => { setResult({ cls: 'copyresult copyhide', text: '' })}, 5000);
        });
    }

    return (
        <div className='buttonContainer'>
            <button data-copytype="hexblock" onClick={handleOnClick}>Copy hex data</button>
            <button data-copytype="originalblock" onClick={handleOnClick}>Copy original data</button>
            <span className={result.cls}>{result.text}</span>
        </div>
    );
}