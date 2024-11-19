import { BiCheck } from "react-icons/bi"
import { Package } from "../utils/constants"

const PackageCard = ({packageMode}:{packageMode: Package}) => {
  return (
    <div
      className={`p-4 cursor-pointer scale-105 w-[300px] border-2 border-primary  rounded-xl`}
    >
      <div>
        <p className="text-primary text-2xl font-semibold capitalize">{packageMode.package}</p>
        <p className="flex gap-1 text-white text-center">
          <span>{packageMode.package}</span>
          <span>{packageMode.level}</span>
        </p>
      </div>
      <hr className="h-[2px] my-3 bg-primary bg-opacity-50" />
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <BiCheck color="#ffffff" size={20} />
          <p className="text-white text-sm">ROI</p>
        </div>
        <div className="flex gap-3">
          <BiCheck color="#ffffff" size={20} />
          <p className="text-white text-sm">Referral commission</p>
        </div>
        <div className="flex gap-3">
          <BiCheck color="#ffffff" size={20} />
          <p className="text-white text-sm">Pool distribution</p>
        </div>
        <div className="flex gap-3">
          <BiCheck color="#ffffff" size={20} />
          <p className="text-white text-sm">Upline returns</p>
        </div>
      </div>
      <div className="mt-5">
        <button
          className={`w-full py-2 rounded-full bg-transparent text-primary transition-colors border-2 shadow-primary font-bold border-primary duration-300`}
        >
          Buy ${packageMode.amount}
        </button>
      </div>
    </div>
  )
}

export default PackageCard