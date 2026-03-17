import { Link } from 'react-router-dom';
import { Clock, Pause, BookOpen, Users, ExternalLink } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import { scenarios } from '@/lib/scenarios';

export default function Teach() {
  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground font-mono mb-2">Teach</h1>
        <p className="text-muted-foreground mb-8">Trainer toolkit for classroom Git sessions.</p>

        <div className="p-6 rounded-xl bg-card border border-border mb-8">
          <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2 font-mono">
            <Users className="w-5 h-5 text-terminal" /> Trainer Controls
          </h3>
          <p className="text-sm text-muted-foreground mb-4">Every widget includes built-in trainer features:</p>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber shrink-0" />
              <span><strong className="text-foreground">Timer</strong> — Track how long exercises take</span>
            </li>
            <li className="flex items-center gap-2">
              <Pause className="w-4 h-4 text-amber shrink-0" />
              <span><strong className="text-foreground">Freeze</strong> — Pause input for explanations</span>
            </li>
            <li className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber shrink-0" />
              <span><strong className="text-foreground">Debrief</strong> — Summary card shown after completion</span>
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-bold text-foreground font-mono mb-4">Quick Links to Widgets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {scenarios.map(s => (
            <Link
              key={s.id}
              to={`/play/${s.id}`}
              className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-terminal/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-terminal/10 text-terminal flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-foreground">{s.title}</h4>
                <p className="text-xs text-muted-foreground truncate">{s.subtitle}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-terminal shrink-0" />
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-terminal/5 border border-terminal/20">
          <h3 className="text-sm font-bold text-terminal font-mono mb-2">💡 Classroom Tips</h3>
          <ul className="text-sm text-foreground/80 space-y-1.5">
            <li>• Open widgets in full-screen mode for presentation</li>
            <li>• Use "Freeze" to pause everyone, then explain the concept</li>
            <li>• Let students attempt without hints first, then reveal progressively</li>
            <li>• Use the debrief card for discussion after each exercise</li>
            <li>• Challenge: who can complete with the best commit messages?</li>
          </ul>
        </div>
      </div>
    </SiteLayout>
  );
}
