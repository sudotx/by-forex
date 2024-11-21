import { ConnectButton } from "@rainbow-me/rainbowkit"
// import { BiMenu } from "react-icons/bi"
import { Link } from "react-router-dom"
// import { co\ }

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full flex justify-between py-2 px-3 md:py-10 md:px-28 backdrop-blur-md z-50">
      <div>
        <span className="text-primary">By</span><span className="text-white">Forex</span>
        {/* <Link to="/" className="text-2xl md:text-4xl font-bold">
        </Link> */}
        <p className="text-white text-[8px] md:text-[10px]">Decengtralized Investments</p>
      </div>
      <div className="gap-2 flex">
        <div >
          <ConnectButton />
        </div>
        {/* <div className="my-auto flex text-primary md:hidden">
          <BiMenu size={30} />
        </div> */}
      </div>
    </div>
  )
}

export default Navbar