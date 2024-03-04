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

export async function POST(request: NextRequest) {
  // Retrieve the body content from the request
  const body = await request.json();

  // VALIDATION:
  // If invalid, return 400
  if (!body.name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  // Else return the JSON response
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
