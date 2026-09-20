import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import SignOutButton from "@/components/admin/SignOutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);
  const whatsappConfigured = Boolean(process.env.NEXT_PUBLIC_PHONE_NUMBER);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar title="Settings" subtitle="Store and administrator settings" />
        <main className="p-6 md:p-8">
          <div className="max-w-2xl space-y-4">
            <section className="rounded-card border border-line bg-surface p-6 shadow-card">
              <h2 className="text-sm font-medium text-ink">Administrator session</h2>
              <p className="mt-1 text-sm text-ink-soft">Signed in as {session?.user?.name ?? "administrator"}.</p>
              <div className="mt-5"><SignOutButton /></div>
            </section>
            <section className="rounded-card border border-line bg-surface p-6 shadow-card">
              <h2 className="text-sm font-medium text-ink">Store integrations</h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-line pb-3"><span className="text-ink-soft">PostgreSQL database</span><span className="font-medium text-pine-700">Connected by server</span></div>
                <div className="flex items-center justify-between border-b border-line pb-3"><span className="text-ink-soft">Cloudinary image uploads</span><span className="font-medium text-pine-700">Configured by server</span></div>
                <div className="flex items-center justify-between"><span className="text-ink-soft">WhatsApp handoff</span><span className={`font-medium ${whatsappConfigured ? "text-pine-700" : "text-amber-500"}`}>{whatsappConfigured ? "Configured" : "Required phone env variable"}</span></div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}