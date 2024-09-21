


const TextBox = ({label, placeholder, onChange, type, value, name, className}) => {
    return <div className="text-sm font-medium text-left py-2">
        <div>
            {label}
        </div>
        <input onChange={onChange} name={name} placeholder={placeholder} type={type} value={value} className={`${className} w-full px-2 py-1 border rounded border-slate-200`}/>
    </div>
}

export default TextBox;