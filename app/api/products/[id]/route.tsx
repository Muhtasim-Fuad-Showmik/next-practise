import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

/**
 * Retrieves details of the specified product
 *
 * @param request with no required format
 * @param param containing the ID of the product to get
 * @returns the retrieved product with the specified ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Fetch data of the specified product from the database
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  // If no product is found, return 404 error
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  // Else return the data
  return NextResponse.json(product);
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
  { params }: { params: { id: string } }
) {
  // Validate the request body
  const body = await request.json();

  // If invalid, return 400 error
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Fetch the product with the given id
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  // If the product does not exist, return 404
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  // Update the product in the database
  const updatedProduct = await prisma.product.update({
    where: { id: product.id },
    data: {
      name: body.name,
      price: parseFloat(body.price),
    },
  });

  // Return the updated product
  return NextResponse.json(updatedProduct);
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
  { params }: { params: { id: string } }
) {
  // Fetch user from the database
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  // If not found, return 404 error
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  // Delete the product
  await prisma.product.delete({
    where: { id: product.id },
  });

  // Return response with 200 status code
  return NextResponse.json({});
}
