import DataView from './DataView'
import Offset from './Offset'
import CopyButtons from './CopyButtons'

interface HexViewerProps {
  data: string | Uint8Array;
}

export default function HexViewer(props: HexViewerProps) {
    /*
    * This component is the main challenge. You can be wild here and change
    * everything!
    */

    /*
        Here is data process, the different kind of display is stored in different array.
        It's not required to split to three parts, but on my approach I found that the most easier. 
    */
    const offsetData = []; // The rows number
    const resultData = []; // The hex result
    const originalData = []; // The original data
    
    for (let i = 0; i < props.data.length; i++) {
        // If the input is a string I change it to charcode, then convert to hex
        let ch = typeof props.data === 'string' ? props.data.charCodeAt(i) : props.data[i];
        let hex = ch.toString(16);

        // After every 16 character I add a row offset
        if (i % 16 === 0) {
            offsetData.push(('00000000' + i.toString(16)).slice(-8) + '\n');
        }

        // Adding a 0 to the hex data if it contains only one character and split from the end.
        resultData.push(('0' + hex.toUpperCase()).slice(-2));
        
        originalData.push(ch);
    }

    return (
        <>
            <CopyButtons />
            <div className='code container'>
                <Offset offset={offsetData} />
                <DataView result={resultData} original={originalData} />
            </div>
        </>
    );
}