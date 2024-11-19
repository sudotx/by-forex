// import { ConnectButton } from "@rainbow-me/rainbowkit"
import { ConnectButton } from "@rainbow-me/rainbowkit"
// import { useState } from "react"
import { Packakges } from "../utils/constants"
import PackageCard from "../components/PackageCard"

const Home = () => {
  // const [active, setActive] = useState(0)
  
  return(
    <div>
      <div className="h-screen w-full absolute top-0 left-0 flex justify-center flex-col items-center">
        <div className="md:-top-10 -top-5 absolute">
          <img src="/svgs/OFF.svg" alt="off img" />
        </div>
        <div className="md:-bottom-10 -bottom-5 absolute">
          <img src="/svgs/25%.svg" alt="off img" />
        </div>
        <div className="absolute top-0 left-0 h-screen w-full -z-50">
          <img src="/svgs/bg.svg" alt="bg-galaxy" />
          <img src="/svgs/bg.svg" className="h-full" alt="bg-galaxy" />
          <img src="/svgs/bg.svg" alt="bg-galaxy" />
        </div>
      </div>

      {/* =================== MAIN PAGE ====================== */}
      <div className="py-20 px-3 overflow-y-scroll home">
        <div>
          <p className="font-bold text-3xl text-center md:text-5xl text-white">INVESTMENT OFFERS</p>
          <p className="text-white text-center py-3 text-sm md:text-base">
            ByForex is a fully decengtralized, web3-based investment platform. The platform will offer users tiered investment packages and income streams through smart contracts, aiming for transparency and automation in managing investment pools and Referral-based incomes. The project emphazises a structured investment approach where users must progress sequentially through the investment packages.
          </p>
          <div className="flex w-full justify-center gap-3 py-3">
            <button className="text-primary border-2 rounded-full px-8 py-2 border-primary">Learn more</button>
            <ConnectButton />
          </div>
        </div>

        {/* ========= PACKAGES ======== */}
        <div className="py-5">
          <p className="text-2xl py-1 text-white font-bold">Packakges</p>
          <div className="w-full package overflow-x-scroll">
            <div className="flex gap-5 py-4 w-full px-2">
              {
                Packakges.map((item, index) => (
                  <div
                    // onMouseEnter={() => setActive(index)}
                  >
                    <PackageCard key={index} packageMode={item} />
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        {/* ========= FOOTER ======== */}
        <div className="flex w-full text-center absolute bottom-0 left-0 justify-center">
          <p className="text-primary text-sm">&copy; {new Date().getFullYear()} ByForex. All rights reserved.</p>
        </div>
      </div>
      
    </div>
  )
}

export default Home