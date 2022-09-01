import React, { useState } from 'react';

interface DataViewProps {
    result: string[];
    original: number[];
}

/*
    The component to show the hex and raw data to the users
*/
export default function DataView(props: DataViewProps) {
    /*
        Setting the data to track the highlighting.
        The nr-s which are currently highlighted is stored in an object, because this seemed the easiest solution to track the nr-s
    */
    const [ highlight, setHighlight ] = useState<any>({
        first: -1,
        current: -1,
        pressing: false,
        highlighted: {}
    });

    /*
        The function to select or deselect the spans which contains the hex and raw values, so if something needs to selected
        or deselected in one of the blocks, the other data which belongs to it also gets selected or deselected.
        --- I think this could have been also solved with states, but still wasn't able to achieve it

        nr - the spans data-nr property
        add - true to add highlight, false to remove
    */
    const addremoveHighlight = (nr: string, add: boolean) => {
        const els = document.querySelectorAll('[data-nr="' + nr + '"]');

        for (let i = 0; i < els.length; i++) {
            let el = els[i],
                cls = el.className;

            if (add) {
                if (cls.indexOf('highlight') === -1) {
                    cls += ' highlight';
                }
            } else if (cls.indexOf('highlight') !== -1) {
                cls = cls.replace(' highlight', '');
            }

            el.className = cls;
        }
    }

    /*
        This function iterates through first on those items which needs removed, then on those which needs to highlighted
    */
    const highlightItems = (current: string, first = highlight.first) => {
        let from = first, to = current;

        if (from === -1) { return; }

        // If the element's nr on which the mouse is over is smaller then the one's which was first selected I switch them
        if (parseInt(highlight.first) > parseInt(current)) {
            from = to;
            to = highlight.first;
        }

        const arr = highlight.highlighted;

        // Remove the highlights
        for (let key in arr) {
            if (parseInt(key) < parseInt(from) || parseInt(key) > parseInt(to)) {
                addremoveHighlight(key, false);

                delete arr[key];
            }
        }

        // Add the highlights
        for (let i = parseInt(from); i <= parseInt(to); i++) {
            arr[i.toString()] = true;
            addremoveHighlight(i.toString(), true);
        }

        // Sets the highlights state
        setHighlight((prevState: any) => {
            return {
                ...prevState,
                current: to,
                highlighted: arr
            }
        });
    };

    /*
        Handles a mouse down event. First it stores the nr of the span on which the event fired and set the state to pressed
        to handle mouse over only if a mousedown occured previously. After that it highlights that element.
    */
    const handleDown = (event: any) => {
        setHighlight((prevState: any) => {
            return {
                ...prevState,
                first: event.target.getAttribute('data-nr'),
                pressing: true
            }
        });

        highlightItems(event.target.getAttribute('data-nr'), event.target.getAttribute('data-nr'));
    };

    /*
        Handles the span over event if a mousedown event occured. It sends the nr of the current span on which the mouse is over and highlights the
        elements in that range from this till the one which the down event was.
    */
    const handleOver = (event: any) => {
        if (highlight.pressing) {
            highlightItems(event.target.getAttribute('data-nr'));
        }
    }

    /*
        If the mouse is up the pressed state is changed to false to stop remove another element
    */
    const handleUp = (event: any) => {
        if (highlight.pressing) {
            setHighlight((prevState: any) => {
                return {
                    ...prevState,
                    first: -1,
                    current: -1,
                    pressing: false
                }
            });
        }
    }

    // The handleup is handled globally, so there wont be any lag in the selection.
    document.onmouseup = handleUp;

    return (
        <>
            <div id="hexblock" className="textblocks">
                {props.result.map((value, index) => {
                    /*
                        Iterating through the result array and adding a span element with the current value.
                        After 16 element a new line is added.
                    */
                    return (
                        <React.Fragment key={index}>
                            <span data-nr={index} className="hexdata"
                                onMouseDown={handleDown}
                                onMouseOver={handleOver}>
                                {value}
                            </span>
                            {(index + 1) % 16 ? '' : '\n'}
                        </React.Fragment>)
                })}
            </div>
            <div id="originalblock" className="textblocks" >
                {props.original.map((value, index) => {
                    /*
                        Iterating through the original array and adding a span element with the original value.
                        If a character needed to be replaced, because it was a control character or a non printable one
                        then it is replaced by a "." character and it's color is set to red.
                        After 16 element a new line is added.
                    */
                    const style = {
                        color: 'black'
                    };

                    let val = '';

                    if (value < 32 || (/[^\x00-\x7F]/g.test(String.fromCharCode(value)))) {
                        style.color = 'red';
                        val = '.';
                    } else {
                        val = String.fromCharCode(value);
                    }

                    return (
                        <React.Fragment key={index}>
                            <span data-nr={index} style={style}
                                onMouseDown={handleDown}
                                onMouseOver={handleOver}>
                                {val}
                            </span>
                            {(index + 1) % 16 ? '' : '\n'}
                        </React.Fragment>)
                })}
            </div>
        </>
    );
}