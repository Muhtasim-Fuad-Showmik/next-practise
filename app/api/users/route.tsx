import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

/**
 * Gets all users from the database
 * ! The request object in the parameter needs to stay even though
 * ! it is unused here, to prevent Next from caching the data otherwise.
 *
 * @param request with no requirements
 * @returns details of all users from the database
 */
export function GET(request: NextRequest) {
  // Fetch all user data from a database
  return NextResponse.json([
    { id: 1, name: "Fuad" },
    { id: 2, name: "Shehjad" },
    { id: 3, name: "Sakif" },
  ]);
}

/**
 * Creates a new user
 *
 * @param request with details of the new user in the body
 * @returns created user object
 */
export async function POST(request: NextRequest) {
  // Retrieve the body content from the request
  const body = await request.json();

  // VALIDATION:
  // If invalid, return 400
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Else return the JSON response
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
