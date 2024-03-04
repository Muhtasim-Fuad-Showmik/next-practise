import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

/**
 * Gets all products from the database
 * ! The request object in the parameter needs to stay even though
 * ! it is unused here, to prevent Next from caching the data otherwise.
 *
 * @param request with no requirements
 * @returns details of all products from the database
 */
export async function GET(request: NextRequest) {
  // Retrieve all products from the database and return them
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
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

  // Create a new user in the database
  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: parseFloat(body.price),
    },
  });

  // Return new created product
  return NextResponse.json(product, { status: 201 });
}
