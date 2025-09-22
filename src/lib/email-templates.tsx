import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PurchaseConfirmationEmailProps {
  userName: string;
  orderDetails: {
    educationId: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    title: string;
    instructor: string;
  }[];
  subtotal: number;
  orderDate: string;
}

export const PurchaseConfirmationEmail = ({
  userName,
  orderDetails,
  subtotal,
  orderDate,
}: PurchaseConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Nutriga Akademi - Satın Alım Onayı</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={logoText}>Nutriga Akademi</Text>
        </Section>

        <Section style={content}>
          <Heading style={h1}>Satın Alım Onayı</Heading>

          <Text style={text}>Merhaba {userName},</Text>

          <Text style={text}>
            Eğitim satın alımınız başarıyla tamamlanmıştır. Aşağıda satın
            aldığınız eğitimlerin detayları bulunmaktadır:
          </Text>

          <Section style={orderSection}>
            <Text style={sectionTitle}>Satın Alınan Eğitimler</Text>

            {orderDetails.map((item, index) => (
              <Section key={index} style={itemStyle}>
                <Text style={itemTitle}>{item.title}</Text>
                <Text style={itemInstructor}>Eğitmen: {item.instructor}</Text>
                <Text style={itemDetails}>Adet: {item.quantity}</Text>
              </Section>
            ))}
          </Section>

          <Text style={text}>
            Satın aldığınız eğitimlere hesabınızdan erişebilirsiniz.
            Eğitimlerinizi görüntülemek için
            <Link href="https://www.nutrigaakademi.com/hesabim" style={link}>
              hesabım
            </Link>
            sayfasını ziyaret edebilirsiniz.
          </Text>

          <Text style={text}>Eğitimlerinizde başarılar dileriz!</Text>

          <Text style={footerText}>
            Bu e-posta {orderDate} tarihinde otomatik olarak gönderilmiştir.
          </Text>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            © 2025 Nutriga Akademi. Tüm hakları saklıdır.
          </Text>
          <Text style={footerText}>
            <Link href="https://www.nutrigaakademi.com" style={link}>
              www.nutrigaakademi.com
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const header = {
  padding: "32px 24px 0",
  textAlign: "center" as const,
};

const logoText = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#2563eb",
  textAlign: "center" as const,
  margin: "0 0 20px 0",
};

const content = {
  padding: "24px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
};

const orderSection = {
  backgroundColor: "#f1f5f9",
  borderRadius: "8px",
  padding: "20px",
  margin: "20px 0",
  border: "1px solid #e2e8f0",
};

const sectionTitle = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 16px 0",
};

const itemStyle = {
  borderBottom: "1px solid #e9ecef",
  padding: "16px 0",
};

const itemTitle = {
  color: "#333",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 4px 0",
};

const itemInstructor = {
  color: "#666",
  fontSize: "14px",
  margin: "0 0 8px 0",
};

const itemDetails = {
  color: "#333",
  fontSize: "14px",
  margin: "0",
};

const totalSection = {
  borderTop: "2px solid #2563eb",
  padding: "16px 0 0 0",
  margin: "16px 0 0 0",
};

const totalText = {
  color: "#333",
  fontSize: "18px",
  textAlign: "right" as const,
  margin: "0",
};

const link = {
  color: "#2563eb",
  textDecoration: "underline",
};

const footer = {
  borderTop: "1px solid #e9ecef",
  padding: "24px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#666",
  fontSize: "12px",
  lineHeight: "16px",
  margin: "8px 0",
};

export default PurchaseConfirmationEmail;
