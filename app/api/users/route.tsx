import { NextRequest, NextResponse } from "next/server";

// The request object in the parameter needs to stay
// even though it is unused here, to prevent Next from
// caching the data otherwise.
export function GET(request: NextRequest) {
  // Fetch all user data from a database
  return NextResponse.json([
    { id: 1, name: "Fuad" },
    { id: 2, name: "Shehjad" },
    { id: 3, name: "Sakif" },
  ]);
}
