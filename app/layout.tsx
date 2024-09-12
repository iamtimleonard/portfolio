import "./global.css";

export const metadata = {
  title: "Tim Leonard's Personal Website",
  description: "iamtimleonard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
