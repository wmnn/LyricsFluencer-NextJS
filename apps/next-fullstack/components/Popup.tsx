export default function Popup({children}) {

    return (
        <div className={`
            fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm 
            flex justify-center items-center text-xl z-[99999]
        `}>
            {children}
        </div>
    )
}