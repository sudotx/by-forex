import { useEffect, useState } from "react";
import { parseAbi } from "viem";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { byForexConfig } from "../../abi";

const packages = [20, 40, 80, 160, 320, 640, 1280, 2560, 5120, 10240, 20480, 40960]
const USDT_ADDRESS = '0x93323bB3896C5eff97320BC63E4FbccB41D0C8C4';

interface DashboardInfo {
  availableIncomeClaim: bigint;
  poolsClaim: bigint[];
  isPoolEligible: boolean[];
  totalIncomeClaim: bigint;
}

// Format BigInt to regular number with commas
const formatAmount = (amount: number) => {
  return (Number(amount)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const formatBigInt = (amount: number | bigint) => {
  return (Number(amount) / 1e18).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Investments = () => {
  const [isApproved, setIsApproved] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const { address } = useAccount()
  const { data: hash, writeContract, error } = useWriteContract()
  const { isLoading: isConfirming } =
    useWaitForTransactionReceipt({
      hash,
    })

  const { data: dashInfo } = useReadContract({
    abi: byForexConfig.abi,
    address: byForexConfig.address as `0x${string}`,
    functionName: 'getUserDashboardInfo',
    args: [address],
  }) as { data: DashboardInfo }

  useEffect(() => {
    if (error) {
      console.log("Error:", error);
    }
  }, [error])

  const handleInvest = () => {
    writeContract({
      abi: byForexConfig.abi,
      address: byForexConfig.address as `0x${string}`,
      functionName: 'invest',
      args: [BigInt(investmentAmount), BigInt(investmentAmount * 1e18)],
    });
  };

  const handleApprove = () => {
    writeContract({
      address: USDT_ADDRESS, // USDT Contract Address
      abi: parseAbi(['function approve(address spender, uint256 amount)']),
      functionName: 'approve',
      args: [byForexConfig.address as `0x`, BigInt(investmentAmount * 1e18)],
    })
    setIsApproved(true);
  }

  const handlePoolClaim = (poolId: number) => {
    writeContract({
      abi: byForexConfig.abi,
      address: byForexConfig.address as `0x${string}`,
      functionName: 'claimPoolShare',
      args: [BigInt(poolId)],
    });
  };


  const renderPackageSelection = () => (
    <div className="w-full gap-2 justify-evenly flex flex-wrap">
      {packages.map((item, index) => (
        <p
          key={index}
          onClick={() => setInvestmentAmount(item)}
          className={`text-black font-semibold p-4 cursor-pointer ${investmentAmount === item ? "bg-neutral-400" : "bg-gray-200"
            }`}
        >
          ${item}
        </p>
      ))}
    </div>
  );


  const renderPoolClaims = () => (
    <div className="flex flex-col gap-3">
      {[1, 2, 3, 4].map((poolId) => (
        <div key={poolId} className="bg-neutral-200 flex justify-between p-2 rounded-lg">
          <p className="text-lg font-semibold my-auto">Pool {poolId}</p>
          <p className="text-primary">
            ${dashInfo?.poolsClaim ? formatBigInt(dashInfo.poolsClaim[poolId - 1]) : 0}
          </p>
          <button
            className="rounded-lg border-2 border-primary text-primary py-1 px-3 font-semibold"
            onClick={() => handlePoolClaim(poolId)}
          >
            Claim
          </button>
        </div>
      ))}
    </div>
  );


  return (
    <div className="px-3 md:px-28 py-20 flex flex-col ">
      <div className="h-screen w-full fixed top-0 left-0 flex justify-center flex-col items-center">
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

      <div className="flex gap-5 z-20 flex-col">
        <div>
          <p className="text-2xl py-4 md:text-4xl text-white font-bold">Investments</p>
          <div className="bg-white w-full rounded-lg py-5 px-3 flex flex-col gap-5">
            {renderPackageSelection()}
            <button
              onClick={!isApproved ? handleApprove : handleInvest}
              disabled={isConfirming || investmentAmount === 0}
              className={`bg-primary w-full py-2 rounded-lg text-lg font-semibold text-white outline-none ${isConfirming ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {isConfirming
                ? 'Confirming...'
                : !isApproved
                  ? `Approve ${formatAmount(investmentAmount)} USDT`
                  : `Invest ${formatAmount(investmentAmount)} USDT`}
            </button>
          </div>
        </div>

        <div>
          <p className="text-2xl py-4 md:text-4xl text-white font-bold">Pool Claim</p>
          <div className="bg-white w-full rounded-lg py-5 px-3">
            {renderPoolClaims()}
          </div>
        </div>

        <div>
          <p className="text-2xl py-4 md:text-4xl text-white font-bold">Income claim</p>
          <div className=" bg-white w-full rounded-lg py-5 px-3 flex flex-col gap-5 ">
            <div className="flex justify-between">
              <p className="font-bold text-lg">Total income claim</p>
              <p className="text-primary">${dashInfo?.totalIncomeClaim ? formatBigInt(dashInfo?.totalIncomeClaim) : 0}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold text-lg">Available income claim</p>
              <p className="text-primary">${dashInfo?.availableIncomeClaim ? formatBigInt(dashInfo?.availableIncomeClaim) : 0}</p>
            </div>
            <div className="flex w-full justify-end"><button className="text-white text-xl font-semibold bg-primary w-fit py-1 px-4 rounded-md">Claim</button></div>
          </div>
        </div>

        <div>
          <p className="text-2xl py-4 md:text-4xl text-white font-bold">Referral link</p>
          <div className=" bg-white w-full rounded-lg py-5 px-3 flex flex-col md:flex-row gap-5 ">
            <div className="w-full">
              <div
                className="w-full border-2 rounded-md border-black h-12 text-lg text-center outline-none font-semibold flex items-center justify-center"
              >
                {`${'byForex.app'}/register/${address?.slice(0, 4)}...${address?.slice(-4)}`}
              </div>
            </div>
            <div className="flex w-full justify-end">
              <button
                onClick={() => navigator.clipboard.writeText(`${"byForex.app"}/register/${address}`)}
                className="text-white text-xl font-semibold bg-primary w-full md:w-fit py-2 px-4 rounded-md"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Investments