import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main className="py-20">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
