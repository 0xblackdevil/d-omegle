import { useState } from 'react'
import { useMetaMask } from "metamask-react";

export default function Navbar() {

    const [state, setState] = useState(false)

    const navigation = [
        { title: "Report", path: "javascript:void(0)" },
        { title: "Help", path: "javascript:void(0)" },
    ]

    const { account } = useMetaMask();

    return (
        <nav className="bg-white w-full border-b md:border-0 md:static">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <a href="javascript:void(0)">
                        <h1 className='text-xl font-extrabold'>D-Omegle</h1>
                    </a>
                </div>
                <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {
                            navigation.map((item, idx) => {
                                return (
                                    <li key={idx} className="text-gray-600 hover:text-indigo-600">
                                        <a href={item.path}>
                                            {item.title}
                                        </a>
                                    </li>
                                )
                            })
                        }
                        <li key="exit" className="text-gray-600 hover:text-red-600">
                            <button onClick={() => console.log("Retuen request")}>Return Stack</button>
                        </li>
                    </ul>
                </div>
                <div className="hidden md:inline-block">
                    <p>{account.slice(0, 8) + "..." + account.slice(-4)}</p>
                </div>
            </div>
        </nav>
    )
}