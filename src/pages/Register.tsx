import { useEffect } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { byForexConfig } from "../../abi";
import { useSearchParams, useNavigate } from "react-router-dom";

const Register = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { isConnected } = useAccount();
    const { writeContract } = useWriteContract();

    const referralAddress = searchParams.get("ref");

    const handleRegister = (upLineAddress: string) => {
        writeContract({
            abi: byForexConfig.abi,
            address: byForexConfig.address as `0x${string}`,
            functionName: "registerUser",
            args: [upLineAddress],
        });
    };

    useEffect(() => {
        if (isConnected && referralAddress) {
            handleRegister(referralAddress as `0x${string}`);
            navigate("/investments");
        }
    }, [isConnected, referralAddress]);

    return (
        <div className="px-3 md:px-28 py-20 min-h-screen">
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

            <div className="flex flex-col items-center justify-center z-20 relative">
                <div className="bg-white p-8 rounded-lg max-w-md w-full">
                    <h1 className="text-2xl font-bold mb-6 text-center">Register with Referral</h1>
                    <div className="text-center">
                        {!isConnected ? (
                            <p className="text-lg">Please connect your wallet to register</p>
                        ) : !referralAddress ? (
                            <p className="text-lg">No referral address provided</p>
                        ) : (
                            <p className="text-lg">Registering with referral: {referralAddress.slice(0, 6)}...{referralAddress.slice(-4)}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
