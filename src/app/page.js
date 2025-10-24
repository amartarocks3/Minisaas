"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/signup'); // redirect to signup on page load
  }, [router]);

  return null; // or loading indicator
}
