import {VncScreen} from "react-vnc";
import {useEffect, useRef, useState} from "react";

export default function VNCViewer({password, id}:any) : JSX.Element{
    const[mounted, setMounted] = useState(false)
    const [url, setUrl] = useState<string>("");
    const vncScreenRef = useRef<React.ElementRef<typeof VncScreen>>(null);

    useEffect(() => {
        setMounted(true)
    })



    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/host/vnc?id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            return data
        }

        fetchData().then(r => setUrl(r.message))
    }, [])

    console.log(url)

    return(
        <>
            {url !== "" &&
                <VncScreen url={"wss://192.168.0.2:5900"}
                           background="#000000"
                           debug
                           style={{
                               width: '75vw',
                               height: '75vh',
                           }}
                           retryDuration={1000}
                           ref={vncScreenRef}
                        //    rfbOptions={{
                        //        credentials: {
                        //            password: "PVEVNC%3A6397D1A7%3A%3AY4t3bU2LCeIZ7H3kuaFYUkzjeznWn0cw%2B3bFYqjZGBg7bQq%2FZsaapjPwHoeCOhvr%2Fd7NvsusgTiN0iQUyEWl0THUfqKrKyFtfY9LGVYa24VID82KkOLSXX%2BbaScIyOvM42kbSZk%2FQKNt7EP3Fjuzf6a0lSSPeXUgOH8eqAdfOzy3%2FuuLUUkD%2BbLxJKCP%2FBvsK9r%2B4DT5LCy%2BRPBfaDDr%2FOCINh9CHs%2BvrJ4i3TysT%2FS06eSSTRhRMKiJWkMAR8xQ35Ac2sAPJND0ElYR%2FJKctmiVh0fmHJ36ZOqvEnDOIPEgjifF%2B6iNB8itCh0uJbMFsljfiS9yL%2FDVjLV2K6qXLg%3D%3D"
                        //        }
                        //    }}
                />
            }
        </>
    )
}
