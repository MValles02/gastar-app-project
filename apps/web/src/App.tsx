import { ArrowUpRight, CreditCard, Wallet } from "lucide-react";
import { appMetadata, healthResponseSchema } from "@gastar/shared";

const healthPreview = healthResponseSchema.parse({
  data: {
    status: "ok",
    message: "API disponible en /api/v1/health",
  },
});

const cards = [
  {
    title: "Entrada rapida",
    copy: "La base del MVP prioriza registrar gastos y transferencias sin friccion.",
    icon: Wallet,
  },
  {
    title: "Monedas separadas",
    copy: `La app mantiene ${appMetadata.supportedCurrencies.join(" y ")} como saldos distintos desde el primer dia.`,
    icon: ArrowUpRight,
  },
  {
    title: "Tarjetas y cuotas",
    copy: "La estructura ya contempla compras con tarjeta y cuotas sin agregar logica de negocio prematura.",
    icon: CreditCard,
  },
];

const appEnvironment = import.meta.env.VITE_APP_ENV ?? "local";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? appMetadata.apiBasePath;

export default function App() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_38%),linear-gradient(180deg,_rgba(255,251,235,0.98),_rgba(255,255,255,1))] px-4 py-10 text-foreground sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <section className="overflow-hidden rounded-[28px] border border-border/60 bg-card/90 p-6 shadow-glow backdrop-blur sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Bootstrap listo
              </span>
              <div className="space-y-3">
                <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
                  {appMetadata.name} ya tiene base real de web, API y
                  despliegue.
                </h1>
                <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                  Esta pantalla confirma el stack documentado: React + Vite +
                  Tailwind en el frontend, contratos compartidos con Zod, y una
                  API versionada lista para crecer sin romper el flujo `develop`
                  -&gt; `main`.
                </p>
              </div>
            </div>

            <div className="grid gap-3 rounded-3xl border border-border/70 bg-background/80 p-4 text-sm text-muted-foreground sm:min-w-72">
              <div>
                <p className="text-xs uppercase tracking-[0.25em]">Entorno</p>
                <p className="mt-1 font-medium text-foreground">
                  {appEnvironment}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em]">API base</p>
                <p className="mt-1 break-all font-mono text-xs text-foreground">
                  {apiBaseUrl}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em]">
                  Health envelope
                </p>
                <p className="mt-1 font-medium text-foreground">
                  {healthPreview.data.message}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {cards.map(({ title, copy, icon: Icon }) => (
            <article
              key={title}
              className="rounded-[24px] border border-border/60 bg-white/85 p-5 shadow-sm shadow-amber-100/60 transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {copy}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
