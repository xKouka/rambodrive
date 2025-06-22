// app/layout.tsx
import '../globals.css'; // Make sure this path is correct for your Tailwind CSS setup

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
      <div className="font-poppins">
                  {children}
      </div>
  );
}