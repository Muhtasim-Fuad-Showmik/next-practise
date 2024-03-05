export { default } from "next-auth/middleware";

// export default middleware; // Can be used when middleware is imported above
export const config = {
  matcher: [
    "/users/:id*", // Execute for zero or more query params for users
  ],
};
