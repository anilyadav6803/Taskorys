


import { NextResponse } from "next/server";

export const responseMessage = {
    success: (message) => NextResponse.json({ message }, { status: 200 }),
    error: (message) => NextResponse.json({ message }, { status: 500 }),
  };