"use client";

import { useMemo, useState } from "react";
import {
  Home, History, Wallet, UserRound, Send, ClipboardList, Search, CheckCircle2,
  Clock3, XCircle, ShieldCheck, Gift, Trophy, MessageCircle, Ticket, Bot,
  FileText, Bell, ChevronRight, Plus, Play, Check, X, Menu, LogOut, Settings,
  CircleHelp, ArrowDownToLine, Sparkles, ListChecks, Eye
} from "lucide-react";

type Task = { id: number; title: string; year: string; description: string; rate: number; active: boolean };
type Submission = { id: number; task: string; user: string; email: string; date: string; status: "Pending" | "Diproses" | "Success" | "Ditolak"; rate: number };

const initialTasks: Task[] = [
  { id: 1, title: "Tugas Email Organisasi", year: "2026", description: "Ikuti instruksi pembuatan email organisasi resmi. Jangan gunakan data palsu atau akun milik orang lain.", rate: 4000, active: true },
  { id: 2, title: "Verifikasi Data Anggota", year: "2026", description: "Periksa kembali data profil dan kirim bukti bahwa seluruh kolom telah dilengkapi.", rate: 2500, active: true },
  { id: 3, title: "Pembaruan Data", year: "2026", description: "Lengkapi pembaruan data sesuai panduan admin.", rate: 3000, active: true }
];
const initialSubs: Submission[] = [
  { id: 101, task: "Tugas Email Organisasi", user: "Faelxz6", email: "faelxz6@example.com", date: "09 Nov 2026, 07.52", status: "Pending", rate: 4000 },
  { id: 102, task: "Verifikasi Data Anggota", user: "RapaUser", email: "rapa@example.com", date: "09 Nov 2026, 07.30", status: "Diproses", rate: 2500 }
];
const money = (n: number) => "Rp" + n.toLocaleString("id-ID");

export default function Page() {
  const [view, setView] = useState<"user" | "admin">("user");
  const [tab, setTab] = useState("Beranda");
  const [tasks, setTasks] = useState(initialTasks);
  const [subs, setSubs] = useState(initialSubs);
  const [balance, setBalance] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", year: "2026", description: "", rate: "4000" });
  const [notice, setNotice] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const counts = useMemo(() => ({
    Pending: subs.filter(s => s.status === "Pending").length,
    Diproses: subs.filter(s => s.status === "Diproses").length,
    Success: subs.filter(s => s.status === "Success").length,
    Ditolak: subs.filter(s => s.status === "Ditolak").length
  }), [subs]);

  function submitTask(task: Task) {
    const next = { id: Date.now(), task: task.title, user: "Pengguna Demo", email: "user@example.com", date: new Date().toLocaleString("id-ID"), status: "Pending" as const, rate: task.rate };
    setSubs(s => [next, ...s]);
    setNotice("Tugas berhasil dikirim dan menunggu pemeriksaan admin.");
    setTab("Riwayat");
  }
  function updateStatus(id: number, status: Submission["status"]) {
    const item = subs.find(s => s.id === id);
    if (!item) return;
    setSubs(old => old.map(s => s.id === id ? { ...s, status } : s));
    if (status === "Success" && item.status !== "Success") setBalance(b => b + item.rate);
    setNotice(status === "Success" ? `Pengiriman disetujui. ${money(item.rate)} ditambahkan ke saldo demo.` : `Status pengiriman diubah menjadi ${status}.`);
  }
  function addTask() {
    if (!newTask.title.trim()) return;
    setTasks(old => [{ id: Date.now(), title: newTask.title, year: newTask.year, description: newTask.description, rate: Number(newTask.rate) || 0, active: true }, ...old]);
    setNewTask({ title: "", year: "2026", description: "", rate: "4000" });
    setShowAdd(false);
    setNotice("Tugas baru ditambahkan (mode demo).");
  }

  const nav = [
    { name: "Beranda", icon: Home }, { name: "Riwayat", icon: History },
    { name: "Stor Tugas", icon: Send }, { name: "Saldo", icon: Wallet }, { name: "Profil", icon: UserRound }
  ];

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><div className="brand-mark"><MailIcon /></div><span><b>S3L</b> <strong>ZERO99</strong></span></div>
        <div className="top-actions"><span className="demo-badge">MODE DEMO</span><button className="wa-btn"><MessageCircle size={17}/> Saluran WA</button><button className="hamb" onClick={() => setMobileMenu(!mobileMenu)}><Menu/></button></div>
      </header>

      <div className="role-switch">
        <span>Pratinjau tampilan</span>
        <div className="segmented"><button className={view === "user" ? "selected" : ""} onClick={() => {setView("user");setTab("Beranda");}}>User</button><button className={view === "admin" ? "selected" : ""} onClick={() => {setView("admin");setTab("Admin");}}>Admin</button></div>
      </div>

      {notice && <div className="toast"><CheckCircle2 size={18}/>{notice}<button onClick={() => setNotice("")}>×</button></div>}

      {view === "user" ? (
        <div className="content">
          {tab === "Beranda" && <>
            <section className="balance-hero">
              <div className="hero-label"><Wallet size={17}/> SALDO ANDA</div>
              <div className="hero-amount">{money(balance)}</div>
              <p>Saldo dari tugas yang telah disetujui admin.</p>
              <div className="hero-actions"><button onClick={() => setTab("Saldo")}><ArrowDownToLine size={16}/> Tarik Saldo</button><button onClick={() => setTab("Riwayat")}><History size={16}/> Riwayat</button></div>
            </section>
            <section className="quick-grid">
              <Quick icon={<Send/>} label="Stor Tugas" color="blue" onClick={() => setTab("Stor Tugas")}/>
              <Quick icon={<History/>} label="Riwayat" color="green" onClick={() => setTab("Riwayat")}/>
              <Quick icon={<Search/>} label="Checker" color="teal" onClick={() => setTab("Riwayat")}/>
              <Quick icon={<Wallet/>} label="Saldo" color="orange" onClick={() => setTab("Saldo")}/>
              <Quick icon={<FileText/>} label="Rules" color="purple" onClick={() => setTab("Rules")}/>
            </section>
            <section className="shortcut-grid">
              <Shortcut icon={<Bot/>} label="Zero Support"/><Shortcut icon={<MessageCircle/>} label="Komunitas"/><Shortcut icon={<Trophy/>} label="Leaderboard"/><Shortcut icon={<Gift/>} label="Referral"/><Shortcut icon={<Ticket/>} label="Laporan"/>
            </section>
            <section className="notice-card"><div className="notice-icon"><ShieldCheck/></div><div><b>Syarat & Ketentuan</b><p>Baca ketentuan penggunaan platform</p></div><ChevronRight/></section>
            <section className="stats-grid">
              <Stat label="DITERIMA" value={counts.Success} icon={<CheckCircle2/>} tone="green"/>
              <Stat label="PENDING" value={counts.Pending} icon={<Clock3/>} tone="yellow"/>
              <Stat label="DITOLAK" value={counts.Ditolak} icon={<XCircle/>} tone="red"/>
              <Stat label="DIPROSES" value={counts.Diproses} icon={<Search/>} tone="blue"/>
            </section>
            <section className="limit-card"><div><b>Aktivitas Tugas Hari Ini</b><strong>{subs.length}/30 · Demo</strong></div><div className="progress"><i style={{width: `${Math.min(subs.length / 30 * 100, 100)}%`}}/></div></section>
          </>}

          {tab === "Stor Tugas" && <Panel title="Daftar Tugas" subtitle="Pilih tugas yang tersedia, baca instruksi, lalu kirim setelah selesai." icon={<Send/>}>
            <div className="searchbox"><Search size={18}/><input placeholder="Cari tugas..." value={search} onChange={e => setSearch(e.target.value)}/></div>
            <div className="task-list">{tasks.filter(t => t.active && t.title.toLowerCase().includes(search.toLowerCase())).map(task => <article className="task-card" key={task.id}><div className="task-top"><span className="task-tag">TUGAS TERSEDIA</span><span className="year-tag">{task.year}</span></div><h3>{task.title}</h3><p>{task.description}</p><div className="task-bottom"><b>{money(task.rate)} <small>/ tugas</small></b><button className="primary-btn" onClick={() => submitTask(task)}>Sudah Dikerjakan <ChevronRight size={16}/></button></div></article>)}</div>
          </Panel>}

          {tab === "Riwayat" && <Panel title="Riwayat Pengiriman" subtitle="Pantau status setiap tugas yang sudah kamu kirim." icon={<History/>}>
            <div className="filter-row">{["Semua","Pending","Diproses","Success","Ditolak"].map(f => <button key={f} className={filter===f?"active":""} onClick={() => setFilter(f)}>{f}</button>)}</div>
            <div className="submission-list">{subs.filter(s => filter==="Semua" || s.status===filter).map(s => <SubmissionCard key={s.id} item={s}/>)}
            {subs.length===0 && <Empty text="Belum ada pengiriman tugas."/>}</div>
          </Panel>}

          {tab === "Saldo" && <Panel title="Saldo Saya" subtitle="Saldo bertambah setelah admin menyetujui tugas." icon={<Wallet/>}>
            <div className="balance-panel"><span>Saldo tersedia</span><b>{money(balance)}</b><small>Minimum penarikan mengikuti kebijakan admin.</small></div>
            <div className="form-card"><h3>Permintaan Penarikan</h3><label>Metode pembayaran</label><select><option>DANA</option><option>OVO</option><option>GoPay</option></select><label>Nomor tujuan</label><input placeholder="Masukkan nomor e-wallet"/><label>Nominal</label><input placeholder="Contoh: 10000" inputMode="numeric"/><button className="primary-btn full" onClick={() => setNotice("Fitur penarikan tersedia setelah backend pembayaran diaktifkan.")}>Ajukan Penarikan</button></div>
          </Panel>}

          {tab === "Profil" && <Panel title="Profil Saya" subtitle="Informasi akun pengguna." icon={<UserRound/>}><div className="profile-card"><div className="avatar">U</div><h2>Pengguna Demo</h2><p>user@example.com</p><div className="profile-row"><span>UID</span><b>DEMO-USER-001</b></div><div className="profile-row"><span>ROLE</span><b>User</b></div><div className="profile-row"><span>Tanggal Gabung</span><b>09 Nov 2026</b></div></div></Panel>}

          {tab === "Rules" && <Panel title="Syarat & Ketentuan" subtitle="Ketentuan penggunaan platform." icon={<ShieldCheck/>}><div className="rules"><p>1. Kerjakan tugas sesuai instruksi resmi yang ditampilkan admin.</p><p>2. Jangan mengirim data palsu, data orang lain, atau informasi rahasia.</p><p>3. Jangan pernah membagikan password, kode OTP, atau recovery code.</p><p>4. Admin akan memeriksa setiap pengiriman sebelum saldo diberikan.</p><p>5. Pengiriman yang tidak sesuai instruksi dapat ditolak.</p></div></Panel>}
        </div>
      ) : (
        <div className="content admin-content">
          <section className="admin-heading"><div><span className="eyebrow">PANEL KONTROL</span><h1>Dashboard Admin</h1><p>Kelola tugas, periksa pengiriman, dan setujui saldo pengguna.</p></div><div className="admin-avatar">A</div></section>
          <section className="admin-stats"><Stat label="TOTAL PENGIRIMAN" value={subs.length} icon={<ClipboardList/>} tone="blue"/><Stat label="PENDING" value={counts.Pending} icon={<Clock3/>} tone="yellow"/><Stat label="DIPROSES" value={counts.Diproses} icon={<Search/>} tone="blue"/><Stat label="SUCCESS" value={counts.Success} icon={<CheckCircle2/>} tone="green"/></section>
          <section className="admin-card"><div className="section-head"><div><h2>Kelola Tugas</h2><p>Buat instruksi tugas dan tentukan rate.</p></div><button className="primary-btn" onClick={() => setShowAdd(true)}><Plus size={17}/> Tambah Tugas</button></div>
            <div className="admin-task-list">{tasks.map(t => <div className="admin-task" key={t.id}><div><b>{t.title}</b><p>Tahun {t.year} · Rate {money(t.rate)}</p></div><span className={t.active?"status success":"status rejected"}>{t.active?"Aktif":"Nonaktif"}</span></div>)}</div>
          </section>
          <section className="admin-card"><div className="section-head"><div><h2>Pengiriman User</h2><p>Periksa hasil tugas yang dikirim pengguna.</p></div><span className="count-pill">{subs.length} data</span></div>
            <div className="filter-row">{["Semua","Pending","Diproses","Success","Ditolak"].map(f => <button key={f} className={filter===f?"active":""} onClick={() => setFilter(f)}>{f}</button>)}</div>
            <div className="admin-sub-list">{subs.filter(s => filter==="Semua" || s.status===filter).map(s => <article className="admin-sub" key={s.id}><div className="sub-info"><div className="sub-avatar">{s.user.slice(0,1).toUpperCase()}</div><div><b>{s.user}</b><p>{s.task}</p><small>{s.email} · {s.date}</small></div></div><div className="sub-right"><b>{money(s.rate)}</b><Status status={s.status}/></div><div className="admin-actions">{s.status==="Pending" && <button className="process-btn" onClick={() => updateStatus(s.id,"Diproses")}><Play size={14}/> Proses</button>}{(s.status==="Pending" || s.status==="Diproses") && <><button className="approve-btn" onClick={() => updateStatus(s.id,"Success")}><Check size={14}/> Setujui</button><button className="reject-btn" onClick={() => updateStatus(s.id,"Ditolak")}><X size={14}/> Tolak</button></>}{s.status==="Success" && <span className="done-label"><CheckCircle2 size={15}/> Selesai</span>}</div></article>)}</div>
          </section>
          <div className="demo-warning"><ShieldCheck size={18}/> Ini pratinjau antarmuka. Login admin, database, dan saldo permanen harus dihubungkan ke backend sebelum dipakai sungguhan.</div>
        </div>
      )}

      {showAdd && <div className="modal-backdrop" onClick={() => setShowAdd(false)}><div className="modal" onClick={e => e.stopPropagation()}><div className="modal-head"><div><span className="eyebrow">KONFIGURASI</span><h2>Tambah Tugas</h2></div><button className="icon-btn" onClick={() => setShowAdd(false)}><X/></button></div><label>Nama tugas</label><input value={newTask.title} onChange={e => setNewTask({...newTask,title:e.target.value})} placeholder="Contoh: Verifikasi data anggota"/><label>Tahun</label><input value={newTask.year} onChange={e => setNewTask({...newTask,year:e.target.value})} placeholder="2026"/><label>Instruksi tugas</label><textarea value={newTask.description} onChange={e => setNewTask({...newTask,description:e.target.value})} placeholder="Tuliskan instruksi lengkap..."/><label>Rate (Rupiah)</label><input value={newTask.rate} onChange={e => setNewTask({...newTask,rate:e.target.value})} inputMode="numeric"/><button className="primary-btn full" onClick={addTask}>Simpan Tugas</button></div></div>}

      <nav className="bottom-nav">{nav.map(n => <button key={n.name} className={tab===n.name?"nav-active":""} onClick={() => setTab(n.name)}><n.icon size={21}/><span>{n.name}</span></button>)}</nav>
      <button className="floating-stor" onClick={() => {setView("user");setTab("Stor Tugas");}}><Send size={28}/></button>
      <footer className="footer-note">ZeroTask · Platform pengelolaan tugas <span>Versi demo 1.0</span></footer>
    </main>
  );
}

function MailIcon(){ return <span className="mail-glyph">✉</span>; }
function Quick({icon,label,color,onClick}:{icon:React.ReactNode;label:string;color:string;onClick:()=>void}){return <button className="quick-item" onClick={onClick}><span className={`quick-icon ${color}`}>{icon}</span><b>{label}</b></button>}
function Shortcut({icon,label}:{icon:React.ReactNode;label:string}){return <div className="shortcut"><span>{icon}</span><small>{label}</small></div>}
function Stat({label,value,icon,tone}:{label:string;value:number;icon:React.ReactNode;tone:string}){return <div className="stat"><span className={`stat-icon ${tone}`}>{icon}</span><div><small>{label}</small><b>{value}</b></div></div>}
function Panel({title,subtitle,icon,children}:{title:string;subtitle:string;icon:React.ReactNode;children:React.ReactNode}){return <section className="panel"><div className="panel-heading"><span className="panel-icon">{icon}</span><div><h1>{title}</h1><p>{subtitle}</p></div></div>{children}</section>}
function Status({status}:{status:Submission["status"]}){const cls=status==="Success"?"success":status==="Ditolak"?"rejected":status==="Diproses"?"processing":"pending";return <span className={`status ${cls}`}>{status}</span>}
function SubmissionCard({item}:{item:Submission}){return <article className="submission-card"><div><b>{item.task}</b><p>{item.date}</p><small>Rate: {money(item.rate)}</small></div><Status status={item.status}/></article>}
function Empty({text}:{text:string}){return <div className="empty"><ClipboardList size={30}/><p>{text}</p></div>}
