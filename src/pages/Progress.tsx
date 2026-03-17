import { Trophy, Target } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import { scenarios } from '@/lib/scenarios';

export default function Progress() {
  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground font-mono mb-2">Progress</h1>
        <p className="text-muted-foreground mb-8">Track your learning journey. Complete widgets to earn badges!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenarios.map(s => (
            <div key={s.id} className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
                  <p className="text-[10px] text-muted-foreground font-mono">{s.difficulty}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Target className="w-3 h-3" /> Not yet completed
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-muted-foreground text-sm">
          <p>Progress tracking coming soon — complete widgets to see badges here!</p>
        </div>
      </div>
    </SiteLayout>
  );
}
