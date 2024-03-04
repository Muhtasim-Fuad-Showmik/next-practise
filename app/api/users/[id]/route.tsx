import { NextRequest, NextResponse } from "next/server";

export function GET(
  reqest: NextRequest,
  { params }: { params: { id: number } }
) {
  // Fetch data of the specified user from the database

  // If no user is found, return 404 error
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Else return the data
  return NextResponse.json({ id: 1, name: "Fuad" });
}
