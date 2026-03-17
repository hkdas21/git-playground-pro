import { useParams, Link } from 'react-router-dom';
import { WidgetShell } from '@/components/widget/WidgetShell';
import { ArrowLeft } from 'lucide-react';
import { scenarios } from '@/lib/scenarios';

export default function WidgetPage() {
  const { widgetId } = useParams();
  const scenario = scenarios.find(s => s.id === widgetId);

  if (!widgetId || !scenario) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-muted-foreground font-mono">
        Widget not found.
        <Link to="/play" className="text-terminal ml-2 hover:underline">← Back</Link>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="px-4 py-2 border-b border-border flex items-center gap-3 shrink-0">
        <Link to="/play" className="text-muted-foreground hover:text-terminal transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <span className="text-sm font-mono text-foreground">{scenario.title}</span>
        <span className="text-xs text-muted-foreground font-mono">— Playground</span>
      </div>
      <div className="flex-1 p-2 min-h-0">
        <WidgetShell scenarioId={widgetId} showTrainerControls />
      </div>
    </div>
  );
}
