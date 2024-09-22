


const Dropdown = ({label, onChange, options= [], onDropdownClick}) => {


    const handleDropdownItemClick = (i, v) => {
        onDropdownClick(i, v);
    }

    return <div className="flex flex-row">
    <div className="text-lg font-medium">{label}</div>
        <select
            onChange={onChange}
            // className="custom-select"
            // aria-label="Filter Employees By Department"
        >
            <option value="ALL">ALL</option>
                {options.map((item, index) => {
                    return  <option key={index} value={item} onClick={() => handleDropdownItemClick(index, item)}>
                    {item}
                </option>
                    
                })}    
        </select>
    
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
    </div>
        

  </div>
}

export default Dropdown;