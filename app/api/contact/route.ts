import { validateContact, type ContactInput } from "@/lib/contact";

function acceptSubmission(submission: ContactInput) {
  // Wire to Resend or Supabase later:
  // await resend.emails.send({ from, to, subject: "AWXFORGE conversation", text: submission.message })
  // await supabase.from("conversations").insert(submission)
  void submission;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, errors: { message: "Invalid request." } }, { status: 400 });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  acceptSubmission(result.data);
  return Response.json({ ok: true });
}
