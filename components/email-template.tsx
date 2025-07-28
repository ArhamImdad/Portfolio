import * as React from "react"

interface EmailTemplateProps {
  name: string
  email: string
  message: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, email, message }) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
    <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
      <h1 style={{ color: "#333", marginBottom: "20px" }}>New Contact Form Submission</h1>

      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "6px", marginBottom: "20px" }}>
        <h2 style={{ color: "#6366f1", marginBottom: "15px" }}>Contact Details</h2>

        <div style={{ marginBottom: "15px" }}>
          <strong style={{ color: "#374151" }}>Name:</strong>
          <p style={{ margin: "5px 0", color: "#6b7280" }}>{name}</p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong style={{ color: "#374151" }}>Email:</strong>
          <p style={{ margin: "5px 0", color: "#6b7280" }}>{email}</p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong style={{ color: "#374151" }}>Message:</strong>
          <div
            style={{
              margin: "10px 0",
              padding: "15px",
              backgroundColor: "#f9fafb",
              borderRadius: "4px",
              color: "#374151",
              lineHeight: "1.6",
            }}
          >
            {message.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < message.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
        <p>This email was sent from your portfolio contact form.</p>
        <p>Reply directly to this email to respond to {name}.</p>
      </div>
    </div>
  </div>
)
