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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // Validate the request body
  const body = await request.json();

  // If invalid, return 400 error
  if (!body.name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  // Fetch the user with the given id

  // If the user does not exist, return 404
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Update the user in the database

  // Return the updated user
  return NextResponse.json({ id: params.id, name: body.name });
}
