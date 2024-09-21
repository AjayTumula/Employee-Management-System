


const Card = ({cardTitle, cardText, totalNumber}) => {
    return <div className="px-2 pt-4 mt-4 pb-3 h-24 border rounded shadow-sm w-1/4 bg-slate-300">
        <div className="text-center pb-1">
        <h4>{cardTitle}</h4>
        </div>
        <hr className="border-none bg-gray-400 h-px m-0" />
        <div className="flex justify-between">
        <h5>{cardText}</h5>
        <h5>{totalNumber}</h5>
        </div>
  </div>
}

export default Card;