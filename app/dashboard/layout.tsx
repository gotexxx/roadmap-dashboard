import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { CommandPalette } from "@/components/dashboard/CommandPalette";
import { DBSyncProvider } from "@/components/DBSyncProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DBSyncProvider>
      <div className="min-h-screen bg-zinc-950">
        <Sidebar />
        <CommandPalette />
        <div className="ml-56 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </DBSyncProvider>
  );
}
