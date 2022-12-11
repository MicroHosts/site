import {VncScreen} from "react-vnc";
import {useEffect, useRef, useState} from "react";

export default function VNCViewer({url}:any) : JSX.Element{
    const[mounted, setMounted] = useState(false)
    const vncScreenRef = useRef<React.ElementRef<typeof VncScreen>>(null);

    useEffect(() => {
        setMounted(true)
    })
    return(
        <>
            {mounted &&
                <VncScreen url={url}
                           background="#000000"
                           debug
                           style={{
                               width: '75vw',
                               height: '75vh',
                           }}
                           ref={vncScreenRef}
                           rfbOptions={{
                               credentials: {
                                   password: ""
                               }
                           }}
                />
            }
        </>
    )
}
