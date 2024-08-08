import Navbar from "../components/User/Navbar";

export default function commentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="max-h-screen flex flex-col">
        <Navbar/>
        <main className="flex items-center justify-center  ">{children}</main>
      </div>
    </section>
  );
}
