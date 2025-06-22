// app/layout.tsx
import '../globals.css'; // Make sure this path is correct for your Tailwind CSS setup

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
      <div className="font-poppins">
        {/* We want a light gray background for the overall page, outside the form. */}
        {/* This div will stretch to fill the viewport and provide that background. */}
        <div className="min-h-screen bg-blue-950 flex flex-col">
          {children}
        </div>
      </div>
  );
}