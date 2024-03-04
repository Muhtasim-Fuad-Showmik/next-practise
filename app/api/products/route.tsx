import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

/**
 * Gets all products from the database
 * ! The request object in the parameter needs to stay even though
 * ! it is unused here, to prevent Next from caching the data otherwise.
 *
 * @param request with no requirements
 * @returns details of all products from the database
 */
export function GET(request: NextRequest) {
  // Retrieve all products from the database and return them
  return NextResponse.json([
    { id: 1, name: "Milk", price: 5 },
    { id: 2, name: "Cereal", price: 3 },
    { id: 3, name: "Juice", price: 4 },
  ]);
}

/**
 * Creates a new product
 *
 * @param request with details of the new product in the body
 * @returns created product object
 */
export async function POST(request: NextRequest) {
  // Retrieve data from the request body
  const body = await request.json();

  // Validate the request body data
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Return new created product
  return NextResponse.json(
    { id: 10, name: body.name, price: body.price },
    { status: 201 }
  );
}
