import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAccount, useDisconnect, useReadContract, useWriteContract } from "wagmi";
import { byForexConfig } from "../../abi";

// const isValidAddress = (address: string | undefined): boolean => {
//   return /^0x[a-fA-F0-9]{40}$/.test(address || '');
// };

type UserInfo = [
  string,    // walletAddress
  bigint,    // currentPackageLevel
  bigint,    // totalInvestment  
  bigint,    // directBusinessVolume
  bigint,    // directReferralCount
  string,    // upline
  bigint,    // totalEarnings
  boolean,   // isRegistered
  bigint,    // totalWithdrawal
  bigint,    // highestPackage
  bigint,    // totalBalance
  bigint     // poolEarnings
]

const Navbar = () => {
  const { address: referralAddress } = useParams();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: hash, writeContract, error } = useWriteContract()

  const handleRegister = () => {
    // if (!isValidAddress(referralAddress)) {
    //   return
    // }
    writeContract({
      abi: byForexConfig.abi,
      address: byForexConfig.address as `0x${string}`,
      functionName: "registerUser",
      args: ["0x7b49660dc6F25326d2fA7C3CD67970dF73eB5Ec1"], // admin line
    });
  };

  const { data: userInfo } = useReadContract({
    abi: byForexConfig.abi,
    address: byForexConfig.address as `0x${string}`,
    functionName: 'users',
    args: [address],
  }) as { data: UserInfo }

  useEffect(() => {
    console.log(referralAddress)
    if (!isConnected) {
      return;
    }
    if (userInfo && userInfo[0] === "0x0000000000000000000000000000000000000000") {
      handleRegister();
    }
  }, [userInfo]);


  useEffect(() => {
    if (hash) {
      console.log("Transaction hash:", hash);
      toast.success(
        <div>
          Transaction sent!
          <a
            href={`https://testnet.bscscan.com/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline ml-1"
          >
            View on BscScan
          </a>
        </div>
      );
    }
  }, [hash]);

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  return (
    <div className="fixed top-0 w-full flex justify-between py-2 px-3 md:py-10 md:px-28 backdrop-blur-md z-40">
      <div className="my-auto">
        <div className="text-2xl md:text-4xl my-auto font-bold">
          <span className="text-primary">By</span><span className="text-white">Forex</span>
        </div>
      </div>
      <div className="gap-2 flex">
        {
          isConnected ? (
            <button onClick={() => disconnect()} className="outline-none text-white scale-[1.01] rounded-full px-8 py-2 bg-primary">Disconnect</button>
          ) : (
            <ConnectButton />
          )
        }
      </div>
    </div>
  )
}

export default Navbar