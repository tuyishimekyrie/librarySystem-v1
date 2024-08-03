import Sidebar from "./Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="max-h-screen flex overflow-hidden">
        <Sidebar />
        <main className="flex-1  bg-gray-100 overflow-y-scroll">
          {children}
        </main>
      </div>
    </section>
  );
}