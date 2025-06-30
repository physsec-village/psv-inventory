import Image from "next/image";
import Link from "next/link";

export default function Navbar(){
    return (<>
        <div className="flex flex-col px-6 py-6 gap-2">
            <div id="navbar-top" className="flex justify-between">
                <div id="branding" className="flex gap-1 items-center">
                    <Image
                        src="/psv-logo.png"
                        width={50}
                        height={50}
                        alt=""
                        role="presentation"
                    />
                    <div className="text-3xl">PSV Inventory</div>
                </div>
                <div id="login">lele</div>
            </div>
            <div id="navbar-bottom">
                <nav>
                    <ul className="flex gap-2">
                    <li>
                        <Link href="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/inventory">Inventory</Link>
                    </li>
                    <li>
                        <Link href="/manufacturing">Manufacturing</Link>
                    </li>
                    <li>
                        <Link href="/reports">Reports</Link>
                    </li>
                    </ul>
                </nav>
            </div>
        </div>
    </>);
}