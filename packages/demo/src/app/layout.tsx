export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('main locale');
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
