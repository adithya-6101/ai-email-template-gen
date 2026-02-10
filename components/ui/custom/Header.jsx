"use client"
import React, { useState, useRef, useEffect } from "react";
import Image from 'next/image'
import { Button } from '../button'
import SignInButton from './SignInButton'
import { useUserDetail } from '@/app/Provider'
import Link from 'next/link'
import { useRouter } from "next/navigation";
function Header() {
  const {userDetail, setUserDetail}=useUserDetail();

   const router = useRouter();
   const [showDropdown, setShowDropdown] = useState(false);
   const dropdownRef = useRef(null);

   const handleSignOut = () => {
     localStorage.removeItem("userDetail");
     setUserDetail(null);
     router.push("/");
   };

   // Close dropdown if clicked outside
   useEffect(() => {
     const handleClickOutside = (event) => {
       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
         setShowDropdown(false);
       }
     };
     document.addEventListener("mousedown", handleClickOutside);
     return () => {
       document.removeEventListener("mousedown", handleClickOutside);
     };
   }, []);

  return (
    <div
      className="flex justify-between items-center p-4 shadow-sm  px-10"
      suppressHydrationWarning
    >
      <Image src={"/logo.svg"} alt="logo" width={100} height={100} />
      <div>
        {userDetail?.email ? (
          <div className="flex gap-3 items-center">
            <Link href={"/dashboard"}>
              <Button>Dashboard</Button>
            </Link>
            <Image
              src={userDetail?.picture}
              alt="user"
              height={35}
              width={35}
              className="rounded-full cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute top-16 right-0 bg-white border rounded shadow-md z-50"
              >
                <button
                  onClick={handleSignOut}
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}

export default Header
