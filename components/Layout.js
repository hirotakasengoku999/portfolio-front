import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Layout({ children, title="next js" }) {
    return (
        <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 text-sm font-mono">
            <Head>
                <title>{title}</title>
            </Head>
            <header>
                <nav className="shadow-md w-screen">
                    <div className="flex items-center pl-8 h-10">
                        <div className="flex space-x-4">
                            <Link href="/">
                                <a className="hover:bg-gray-100 px-3 py-2 rounded">
                                    Home
                                </a>
                            </Link>
                            <Link href="/blog-pages">
                                <a className="hover:bg-gray-100 px-3 py-2 rounded">
                                    Blog
                                </a>
                            </Link>
                            <Link href="/servisis-page">
                                <a className="hover:bg-gray-100 px-3 py-2 rounded">
                                    Servis
                                </a>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="flex flex-1 justify-center items-center flex-col w-screen">
                {children}
            </main>
            <footer className="w-full h-10 flex justify-center items-center text-gray-500 text-sm border-t">
                @hirosen 2022
            </footer>
        </div>
    );
}