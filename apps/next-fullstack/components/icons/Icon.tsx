export default function Icon({children, onClick}) {
    return <button className="hover:text-gray-500 transition-all" onClick={() => onClick()}>
        {children}
    </button>
}

Icon.defaultProps = {
    onClick: () => {},
  };