import Link from 'next/link';

export const Navbar = () => {
    return (
        <div className='flex flex-col items-center '>
            <nav className="flex w-full ">

                <div className='container min-w-full mx-auto flex h-[4rem] justify-end items-center'>
                    <Link href="/" className='mx-2 group'>
                        <p className='group-hover:text-orange-300'>Home</p>
                    </Link>
                    <Link href="/create" className='mx-2 group'>
                        <p className='group-hover:text-orange-300'>Create</p>
                    </Link>
                    <Link href="/about" className='mx-2 group'>
                        <p className='group-hover:text-orange-300'>About</p>
                    </Link>
                    <Link href="/examples" className='mx-2 group'>
                        <p className='group-hover:text-orange-300'>Examples</p>
                    </Link>
                    <Link href="/faq" className='mx-2 group'>
                        <p className='group-hover:text-orange-300'>FAQ</p>
                    </Link>
                </div>

            </nav>
            <hr className="h-px bg-white border-0.5 opacity-90 w-[95%] "></hr>
        </div>
        
        
    )
};   