"use client";

import { useState } from 'react';

export default function ContactForm() {
    const [result, setResult] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("loading");
        setResult("Sending....");
        const formData = new FormData(event.currentTarget);

        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
        if (!accessKey) {
            setResult("Error: Access Key is missing");
            setStatus("error");
            return;
        }
        formData.append("access_key", accessKey);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
                setResult("Success!");
                (event.target as HTMLFormElement).reset();
            } else {
                console.log("Error", data);
                setResult(data.message);
                setStatus("error");
            }
        } catch (error) {
            console.log("Error", error);
            setResult("Something went wrong");
            setStatus("error");
        }
    };

    return (
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 560 }}>
            {/* Honeypot Spam Protection */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }}></input>

            <input
                name="name"
                type="text"
                required
                placeholder="Your Name"
                style={{
                    padding: 12,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,.15)",
                    background: "#0b0d14",
                    color: "var(--fg)",
                }}
            />
            <input
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                style={{
                    padding: 12,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,.15)",
                    background: "#0b0d14",
                    color: "var(--fg)",
                }}
            />
            <textarea
                name="message"
                required
                placeholder="Tell us about your project"
                rows={5}
                style={{
                    padding: 12,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,.15)",
                    background: "#0b0d14",
                    color: "var(--fg)",
                }}
            />
            <button
                className="cta"
                type="submit"
                disabled={status === "loading"}
            >
                {status === "loading" ? "Sending..." : "Send"}
            </button>
            {result && (
                <p style={{
                    marginTop: 12,
                    color: status === "success" ? "#4ade80" : (status === "error" ? "#f87171" : "var(--fg)"),
                    fontSize: "14px"
                }}>
                    {result}
                </p>
            )}
        </form>
    );
}
