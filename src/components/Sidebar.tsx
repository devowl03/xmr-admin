"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-52 h-screen text-white"
            style={{
                borderRadius: "12px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
            }}>
            <div className="p-4 pr-0 space-y-4">
                <h2 className="text-lg font-bold">
                    <Link href="/">
                        <p className={`${pathname === '/' ? 'font-black' : ''}`}>Home</p>
                    </Link>
                </h2>
                <h2 className="text-lg font-bold">Graphs</h2>
                <ul className="mt-4 space-y-2">
                    <li>
                        <Link href="/graphs/revenue">
                            <p className={`p-2 block rounded-md ${pathname === '/graphs/revenue' ? 'font-black' : 'hover:bg-gray-700'}`}>
                                Revenue Graph
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/graphs/signup">
                            <p className={`p-2 block rounded-md  ${pathname === '/graphs/signup' ? 'font-black' : 'hover:bg-gray-700'}`}>
                                Signup Graph
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/graphs/affiliateInvite">
                            <p className={`p-2 block rounded-md  ${pathname === '/graphs/affiliateInvite' ? 'font-black' : 'hover:bg-gray-700'}`}>
                                Affiliate Invite Graph
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/graphs/betsPlaced">
                            <p className={`p-2 block rounded-md  ${pathname === '/graphs/betsPlaced' ? 'font-black' : 'hover:bg-gray-700'}`}>
                                Bets Placed Graph
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/graphs/transaction">
                            <p className={`p-2 block rounded-md  ${pathname === '/graphs/transaction' ? 'font-black' : 'hover:bg-gray-700'}`}>
                                Transaction Graph
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
