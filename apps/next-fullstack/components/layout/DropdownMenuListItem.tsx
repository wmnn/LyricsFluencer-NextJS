export default function DropdownMenuListItem({title, onClick}) {

    return <li className="hover:cursor-pointer" onClick={() => onClick()}>{title}</li>
}