import { useParams, Link } from 'react-router-dom';
import SiteLayout from '@/components/layout/SiteLayout';
import { WidgetShell } from '@/components/widget/WidgetShell';
import { learnPages } from '@/lib/learn-content';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function LearnPage() {
  const { pageId } = useParams();
  const pageIndex = learnPages.findIndex(p => p.id === pageId);
  const page = learnPages[pageIndex];

  if (!page) {
    return (
      <SiteLayout>
        <div className="p-12 text-center text-muted-foreground">
          <p>Page not found.</p>
          <Link to="/learn" className="text-terminal hover:underline mt-2 inline-block">← Back to lessons</Link>
        </div>
      </SiteLayout>
    );
  }

  const prev = pageIndex > 0 ? learnPages[pageIndex - 1] : null;
  const next = pageIndex < learnPages.length - 1 ? learnPages[pageIndex + 1] : null;

  return (
    <SiteLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/learn" className="text-sm text-muted-foreground hover:text-terminal flex items-center gap-1 mb-3">
            <ArrowLeft className="w-3 h-3" /> Back to lessons
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono text-terminal bg-terminal/10 px-2 py-0.5 rounded">
              Lesson {pageIndex + 1}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground font-mono">{page.title}</h1>
          <p className="text-muted-foreground mt-1">{page.subtitle}</p>
        </div>

        <div className="mb-8 space-y-3">
          {page.content.map((p, i) => (
            <p key={i} className="text-foreground/80 text-sm leading-relaxed">{p}</p>
          ))}
        </div>

        {page.widgetId && (
          <div className="h-[550px] mb-8">
            <WidgetShell scenarioId={page.widgetId} />
          </div>
        )}

        <div className="flex justify-between mb-8">
          {prev ? (
            <Link to={`/learn/${prev.id}`} className="flex items-center gap-2 text-sm font-mono font-semibold px-4 py-2.5 rounded-lg bg-terminal text-primary-foreground hover:bg-terminal/90 transition-colors">
              <ArrowLeft className="w-4 h-4" /> {prev.title}
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/learn/${next.id}`} className="flex items-center gap-2 text-sm font-mono font-semibold px-4 py-2.5 rounded-lg bg-terminal text-primary-foreground hover:bg-terminal/90 transition-colors">
              {next.title} <ArrowRight className="w-4 h-4" />
            </Link>
          ) : <div />}
        </div>

        <details className="bg-card border border-border rounded-xl p-4 mb-8">
          <summary className="text-sm font-bold text-foreground cursor-pointer font-mono">
            🎓 Trainer Debrief Notes
          </summary>
          <p className="text-sm text-muted-foreground mt-3 whitespace-pre-line leading-relaxed">{page.trainerNotes}</p>
        </details>
      </div>
    </SiteLayout>
  );
}
