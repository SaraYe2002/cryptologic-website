import nodemailer from "nodemailer";

export async function POST(request: Request){
  const { email, message } = await request.json().catch(()=>({ email:"", message:"" }));

  const to = process.env.CONTACT_TO || "contact@placeholder.dev";
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";

  try{
    if(host && user && pass){
      const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
      await transporter.sendMail({
        from: user,
        to,
        subject: `New website inquiry from ${email || "unknown"}`,
        text: message || "(no message)",
      });
    } else {
      console.info("[contact] Email would be sent:", { to, email, message });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err){
    console.error("[contact] Error sending email", err);
    return new Response(JSON.stringify({ ok: false }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
