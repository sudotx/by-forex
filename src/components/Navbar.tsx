import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount, useDisconnect } from "wagmi"

const Navbar = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  
  return (
    <div className="fixed top-0 w-full flex justify-between py-2 px-3 md:py-10 md:px-28 backdrop-blur-md z-40">
      <div className="my-auto">
        <div className="text-2xl md:text-4xl my-auto font-bold">
          <span className="text-primary">By</span><span className="text-white">Forex</span>
        </div>
        {/* <p className="text-white text-[8px] md:text-[10px]">Decengtralized Investments</p> */}
      </div>
      <div className="gap-2 flex">
        {
          isConnected ? (
            <button onClick={() => disconnect()} className="outline-none text-white scale-[1.01] rounded-full px-8 py-2 bg-primary">Disconnect</button>
          ) : (
            <ConnectButton />
          )
        }
        {/* <div className="my-auto flex text-primary md:hidden">
          <BiMenu size={30} />
        </div> */}
      </div>
    </div>
  )
}

export default Navbar