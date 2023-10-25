import { RefObject, useEffect, useRef } from 'react'

function useClickOutside(ref: RefObject<HTMLDivElement>, onClickOutside: () => void) {
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClickOutside()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref, onClickOutside])
}

interface ClickOutsideListener {
    children: React.ReactNode
    onClickOutside: () => void
}


const ClickOutsideListener: React.FC<ClickOutsideListener> = ({ children, onClickOutside }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    useClickOutside(wrapperRef, onClickOutside);

    return <div ref={wrapperRef}>{children}</div>;
}

export default ClickOutsideListener