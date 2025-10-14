'use client';

import Link from 'next/link';

export default function Banner({ title = '', image = '' }) {
  return (
    <div
      className="bg-gray-100 relative w-full px-4 md:px-12 xl:px-24 2xl:px-40 py-6"
      // style={{
      //   backgroundImage: `url(${image})`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat',
      // }}
    >
      {/* Text Content */}
      <div className="relative z-10 px-4">
        {/* <h1 className="text-2xl md:text-4xl font-mosetta font-medium text-[#99571d]  capitalize">  {title.split('-').join(' ')}</h1> */}
        <div className="mt-2 space-x-1 text-sm md:text-base  ">
          <Link href="/" className="hover:underline text-[#2ea2cc]">Home</Link>
          <span>/</span>
          <span className="capitalize ">{title}</span>
        </div>
      </div>
    </div>
  );
}