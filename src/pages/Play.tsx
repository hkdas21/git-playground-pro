import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play as PlayIcon, Clock, Zap } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import { scenarios } from '@/lib/scenarios';

export default function PlayPage() {
  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground font-mono mb-2">Play</h1>
        <p className="text-muted-foreground mb-8">Interactive Git playgrounds. Pick one and start experimenting!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link
                to={`/play/${s.id}`}
                className="block p-5 rounded-xl bg-card border border-border hover:border-terminal/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <PlayIcon className="w-4 h-4 text-terminal" />
                  <h3 className="font-bold text-foreground">{s.title}</h3>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ml-auto font-mono ${
                    s.difficulty === 'beginner' ? 'bg-terminal/10 text-terminal' :
                    s.difficulty === 'intermediate' ? 'bg-amber/10 text-amber' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {s.difficulty}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{s.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {s.timebox && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {Math.floor(s.timebox / 60)} min
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {s.allowedCommands.length} commands
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
