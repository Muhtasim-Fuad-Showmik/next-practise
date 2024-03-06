import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

/**
 * Retrieves details of the specified user
 *
 * @param request with no required format
 * @param param containing the ID of the user to get
 * @returns the retrieved user with the specified ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Fetch data of the specified user from the database
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  // If no user is found, return 404 error
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Else return the data
  return NextResponse.json(user);
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
  { params }: { params: { id: string } }
) {
  // Validate the request body
  const body = await request.json();

  // If invalid, return 400 error
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Fetch the user with the given id
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  // If the user does not exist, return 404
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Update the user in the database
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  // Return the updated user
  return NextResponse.json(updatedUser);
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
  { params }: { params: { id: string } }
) {
  // Fetch user from the database
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  // If not found, return 404 error
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Delete the user
  await prisma.user.delete({
    where: { id: user.id },
  });

  // Return response with 200 status code
  return NextResponse.json({});
}
