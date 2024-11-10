import { languages } from '../../staticData';

export default function SelectLanguageMenu({handleChange, title}) {

    return <>
    
        <label className=" text-gray-600">{title}</label>

        <select name="languages" id="languages" className={'pl-4 pr-4 pt-2 pb-2 text-lg border-gray-200 border-[1px] hover:bg-gray-200 transition-all w-min text-center rounded-md shadow-xl hover:cursor-pointer text-black'} onChange={(e) => handleChange(e.target.value)}>
            {languages.map((lang, i) => 
                    <option key={i} value={lang.code}>{lang.name}</option>
            )}
        </select>

    </>
}