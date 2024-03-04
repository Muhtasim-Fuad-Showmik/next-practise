import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

/**
 * Retrieves details of the specified user
 *
 * @param reqest with no required format
 * @param param containing the ID of the user to get
 * @returns the retrieved user with the specified ID
 */
export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // Fetch data of the specified user from the database

  // If no user is found, return 404 error
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Else return the data
  return NextResponse.json({ id: 1, name: "Fuad" });
}

/**
 * Updates the specified user
 *
 * @param request containing update body
 * @param param with an ID
 * @returns updated user
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // Validate the request body
  const body = await request.json();

  // If invalid, return 400 error
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Fetch the user with the given id

  // If the user does not exist, return 404
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Update the user in the database

  // Return the updated user
  return NextResponse.json({ id: params.id, name: body.name });
}

/**
 * Deletes the specified user from the database
 *
 * @param request with no requirements
 * @param param with ID of the user to delete
 * @returns an empty object
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // Fetch user from the database

  // If not found, return 404 error
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 400 });

  // Delete the user

  // Return response with 200 status code
  return NextResponse.json({});
}
