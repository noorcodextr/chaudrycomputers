"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button type="button" onClick={() => signOut({ callbackUrl: "/login" })} className="border border-line px-4 py-2 text-sm font-medium text-ink hover:border-pine-500 hover:text-pine-700">
      Sign out
    </button>
  );
}
