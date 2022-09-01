interface OffsetProps {
    offset: string[]
}

/*
    A simple component to show the offset data
*/
export default function Offset(props: OffsetProps) {
    return (
        <div className="textblocks offset">
            {props.offset.map((value, index) => {
                return (
                    <span key={index} className='hexoffset'>
                        {value}
                    </span>
                )
            })}
        </div>
    );
}