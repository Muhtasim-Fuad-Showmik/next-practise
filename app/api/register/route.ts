import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export async function POST(request: NextRequest) {
  // Retrieve data from the body of the request
  const body = await request.json();

  // Validate data from request body using zod
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Check if there exists a user with the same email already,
  // in which case throw an error
  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (user)
    return NextResponse.json(
      { error: "User already exists!" },
      { status: 400 }
    );

  // If user email is new, create the user with his password hashed
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
    },
  });

  // Return the newly registered user without the hashed password
  return NextResponse.json({ email: newUser.email });
}
