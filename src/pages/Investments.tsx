import { useEffect, useState } from "react";
import { parseAbi } from "viem";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { byForexConfig } from "../../abi";

const packages = [20, 40, 80, 160, 320, 640, 1280, 2560, 5120, 10240, 20480, 40960]

const Investments = () => {
  const [isApproved, setIsApproved] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const { address } = useAccount()
  const { data: hash, writeContract, error } = useWriteContract()
  const { isLoading: isConfirming } =
    useWaitForTransactionReceipt({
      hash,
    })

  const [txStatus, setTxStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [notification, setNotification] = useState('')

  const isTransacting = isConfirming || txStatus === 'pending'

  const { data: dashInfo } = useReadContract({
    abi: byForexConfig.abi,
    address: byForexConfig.address as `0x${string}`,
    functionName: 'getUserDashboardInfo',
    args: [address],
  })
  const { data: userInfo } = useReadContract({
    abi: byForexConfig.abi,
    address: byForexConfig.address as `0x${string}`,
    functionName: 'users',
    args: [address],
  })
  // console.log("dash data", dashInfo);

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
      address: '0x93323bB3896C5eff97320BC63E4FbccB41D0C8C4', // USDT Contract Address
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

  const handleRegister = (upLineAddress: string) => {
    writeContract({
      abi: byForexConfig.abi,
      address: byForexConfig.address as `0x${string}`,
      functionName: 'registerUser',
      args: [upLineAddress],
    });
  };

  const handleCreatePackage = (upLineAddress: string) => {
    writeContract({
      abi: byForexConfig.abi,
      address: byForexConfig.address as `0x${string}`,
      functionName: 'createPackage',
      args: [BigInt(1), BigInt(1)],
    });
  };
  const handleConfigurePoolRequirements = (upLineAddress: string) => {
    writeContract({
      abi: byForexConfig.abi,
      address: byForexConfig.address as `0x${string}`,
      functionName: 'createPackage',
      args: [BigInt(1), BigInt(1)],
    });
  };
  const handleDistributePoolIncome = (upLineAddress: string) => {
    writeContract({
      abi: byForexConfig.abi,
      address: byForexConfig.address as `0x${string}`,
      functionName: 'createPackage',
      args: [BigInt(1), BigInt(1)],
    });
  };
  const handleDistributeToPools = (upLineAddress: string) => {
    writeContract({
      abi: byForexConfig.abi,
      address: byForexConfig.address as `0x${string}`,
      functionName: 'createPackage',
      args: [BigInt(1), BigInt(1)],
    });
  };

  const handleUpdatePoolEligibility = (upLineAddress: string) => {
    writeContract({
      abi: byForexConfig.abi,
      address: byForexConfig.address as `0x${string}`,
      functionName: 'createPackage',
      args: [BigInt(1), BigInt(1)],
    });
  };

  // Format BigInt to regular number with commas
  const formatAmount = (amount: number) => {
    return (Number(amount) / 1e18).toLocaleString('en-US', {
      maximumFractionDigits: 2
    }).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if (error) {
      console.log('Transaction error:', error);
    }
    console.log("Address", address);
  }, [error]);



  useEffect(() => {
    if (isConfirming) {
      setTxStatus('pending')
      setNotification('Transaction pending...')
    } else if (hash) {
      setTxStatus('success')
      setNotification('Transaction successful!')
    } else if (error) {
      setTxStatus('error')
      setNotification(error.message)
    }
  }, [isConfirming, hash, error])

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
          <div className=" bg-white w-full rounded-lg py-5 px-3 flex flex-col gap-5 ">
            <div className="w-full gap-2 justify-evenly flex flex-wrap">
              {packages.map((item, index) => (
                <p onClick={() => setInvestmentAmount(item)} key={index} className={`text-black font-semibold p-4 ${investmentAmount == item ? "bg-neutral-400" : "bg-gray-200"}`}>${item}</p>
              ))}
            </div>
            <button
              onClick={!isApproved ? handleApprove : handleInvest}
              disabled={isTransacting || investmentAmount === 0}
              className={`bg-primary w-full py-2 rounded-lg text-lg font-semibold text-white outline-none ${isConfirming ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isConfirming ? 'Confirming...' : !isApproved ? `Approve ${formatAmount(investmentAmount)} USDT` : `Invest ${formatAmount(investmentAmount)} USDT`}
            </button>
          </div>
        </div>

        <div>
          <p className="text-2xl py-4 md:text-4xl text-white font-bold">Pool Claim</p>
          <div className=" bg-white w-full rounded-lg py-5 px-3 flex flex-col gap-3 ">
            <div className="bg-neutral-200 flex justify-between p-2 rounded-lg">
              <p className="text-lg font-semibold my-auto">Pool 1</p>
              <p className="text-primary">${dashInfo ? 1 : 0}</p>
              <button className="rounded-lg border-2 border-primary text-primary py-1 px-3 font-semibold" onClick={() => { handlePoolClaim(1) }}>Claim</button>
            </div>
            <div className="bg-neutral-200 flex justify-between p-2 rounded-lg">
              <p className="text-lg font-semibold my-auto">Pool 2</p>
              <p className="text-primary">${dashInfo ? 1 : 0}</p>
              <button className="rounded-lg border-2 border-primary text-primary py-1 px-3 font-semibold" onClick={() => { handlePoolClaim(2) }}>Claim</button>
            </div>
            <div className="bg-neutral-200 flex justify-between p-2 rounded-lg">
              <p className="text-lg font-semibold my-auto">Pool 3</p>
              <p className="text-primary">${dashInfo ? 1 : 0}</p>
              <button className="rounded-lg border-2 border-primary text-primary py-1 px-3 font-semibold" onClick={() => { handlePoolClaim(3) }}>Claim</button>
            </div>
            <div className="bg-neutral-200 flex justify-between p-2 rounded-lg">
              <p className="text-lg font-semibold my-auto">Pool 4</p>
              <p className="text-primary">${dashInfo ? 1 : 0}</p>
              <button className="rounded-lg border-2 border-primary text-primary py-1 px-3 font-semibold" onClick={() => { handlePoolClaim(4) }}>Claim</button>
            </div>
          </div>
        </div>

        <div>
          <p className="text-2xl py-4 md:text-4xl text-white font-bold">Income claim</p>
          <div className=" bg-white w-full rounded-lg py-5 px-3 flex flex-col gap-5 ">
            <div className="flex justify-between">
              <p className="font-bold text-lg">Total income claim</p>
              <p className="text-primary">${dashInfo ? 1 : 0}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold text-lg">Available income claim</p>
              <p className="text-primary">${dashInfo ? 1 : 0}</p>
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
                {`${'byForex.app'}?ref=${address?.slice(0, 4)}...${address?.slice(-4)}`}
              </div>
            </div>
            <div className="flex w-full justify-end">
              <button
                onClick={() => navigator.clipboard.writeText(`${"byForex.app"}?ref=${address}`)}
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