import WelcomeTemplate from "@/emails/WelcomeTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  resend.emails.send({
    from: "something@domain.com",
    to: "muhtasim.zoloinc@gmail.com",
    subject: "Sample Subject",
    react: <WelcomeTemplate name="Fuad" />,
  });

  return NextResponse.json({});
}
