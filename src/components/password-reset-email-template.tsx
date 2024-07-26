import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export function PasswordResetEmailTemplate(
  resetLink: string,
  name: string | null
) {
  return (
    <Html>
      <Head />
      <Preview>Reset Your Password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={wrap}>
            <Text style={paragraph}>Hi {name !== null ? name : "👋"},</Text>
            <Text style={paragraph}>
              We received a request to reset your password. Click the button
              below to reset it. <br /> If you did not make this request, you
              can safely ignore this message.
            </Text>
            <Section style={btnContainer}>
              <Button style={button} href={resetLink}>
                Reset Password
              </Button>
            </Section>
            <Text style={textStyle}>
              If the button above doesn’t work, you can manually reset your
              password by copying and pasting <br /> the following link into
              your browser:
            </Text>
            <Text style={linkStyle}>
              <Link href={resetLink} style={underlineStyle}>
                {resetLink}
              </Link>
            </Text>
          </Section>
        </Container>
        <Text style={footerTextStyle}>
          This message was produced and distributed by our team. ©{" "}
          {new Date().getFullYear()}, All rights reserved. For more information,
          view our{" "}
          <Link href={resetLink} target="_blank" style={underlineStyle}>
            privacy policy
          </Link>
          .
        </Text>
      </Body>
    </Html>
  );
}

const main = {
  color: "#fff",
  fontFamily:
    '"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: "#1a202c",
  maxWidth: "700px",
  color: "#fff",
  borderRadius: "5px",
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  color: "#fff",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
  maxWidth: "250px",
};

const wrap = {
  margin: "15px 25px",
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const footerTextStyle = {
  color: "#a0aec0",
  fontSize: "12px",
  marginTop: "20px",
  textAlign: "center" as const,
};

const underlineStyle = {
  textDecoration: "underline",
};

const textStyle = {
  color: "#cbd5e0",
  fontSize: "14px",
  marginBottom: "16px",
};

const linkStyle = {
  color: "#63b3ed",
  fontSize: "14px",
  wordBreak: "break-word" as const,
};
