"use client"

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

export default function Logout() {
  const router = useRouter();  

  useEffect(() => { 
    window.localStorage.removeItem("access_token")
    router.push('/');
  })
  return
}

