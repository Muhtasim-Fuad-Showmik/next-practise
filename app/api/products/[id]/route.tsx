import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

/**
 * Retrieves details of the specified product
 *
 * @param reqest with no required format
 * @param param containing the ID of the product to get
 * @returns the retrieved product with the specified ID
 */
export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // Fetch data of the specified product from the database

  // If no product is found, return 404 error
  if (params.id > 10)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  // Else return the data
  return NextResponse.json({ id: 1, name: "Milk", price: "45" });
}

/**
 * Updates the specified product
 *
 * @param request containing update body
 * @param param with an ID
 * @returns updated product
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

  // Fetch the product with the given id

  // If the product does not exist, return 404
  if (params.id > 10)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  // Update the product in the database

  // Return the updated product
  return NextResponse.json({
    id: params.id,
    name: body.name,
    price: body.price,
  });
}

/**
 * Deletes the specified product from the database
 *
 * @param request with no requirements
 * @param param with ID of the product to delete
 * @returns an empty object
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // Fetch user from the database

  // If not found, return 404 error
  if (params.id > 10)
    return NextResponse.json({ error: "Product not found" }, { status: 400 });

  // Delete the product

  // Return response with 200 status code
  return NextResponse.json({});
}
