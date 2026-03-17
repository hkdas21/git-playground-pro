import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Play, Users, Trophy, GitBranch, Terminal, ArrowRight, Zap } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';

const features = [
  { icon: BookOpen, title: 'Learn', desc: '10 visual lessons from basics to branching', path: '/learn', color: 'text-terminal' },
  { icon: Play, title: 'Play', desc: 'Interactive Git playgrounds in your browser', path: '/play', color: 'text-amber' },
  { icon: Users, title: 'Teach', desc: 'Trainer toolkit with timer, freeze & debrief', path: '/teach', color: 'text-primary' },
  { icon: Trophy, title: 'Progress', desc: 'Track your learning with badges', path: '/progress', color: 'text-terminal' },
];

export default function Index() {
  return (
    <SiteLayout>
      <section className="py-20 md:py-28 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-terminal/10 text-terminal text-sm font-mono mb-6">
            <GitBranch className="w-4 h-4" />
            Interactive Git Learning
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 font-mono leading-tight">
            Learn Git<br />
            <span className="text-terminal">Visually</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            Master Git with real commands, visual feedback, and hands-on exercises.
            No installation needed — everything runs in your browser.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-terminal text-primary-foreground font-mono font-bold hover:opacity-90 transition-opacity"
            >
              Start Learning <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/play"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-mono hover:bg-muted transition-colors"
            >
              <Terminal className="w-4 h-4" /> Try a Widget
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto px-4">
        {features.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
            <Link to={f.path} className="block p-6 rounded-xl bg-card border border-border hover:border-terminal/30 transition-all group">
              <f.icon className={`w-8 h-8 mb-3 ${f.color}`} />
              <h3 className="text-lg font-bold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </Link>
          </motion.div>
        ))}
      </section>

      <section className="py-12 max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-amber/60" />
              <div className="w-3 h-3 rounded-full bg-terminal/60" />
            </div>
            <span className="text-xs text-muted-foreground font-mono">Terminal Preview</span>
          </div>
          <div className="p-4 font-mono text-sm space-y-1">
            <div><span className="text-terminal">$ </span><span className="text-foreground">git init</span></div>
            <div className="text-muted-foreground">Initialized empty Git repository.</div>
            <div><span className="text-terminal">$ </span><span className="text-foreground">git add .</span></div>
            <div className="text-terminal">Added 2 file(s) to staging area.</div>
            <div><span className="text-terminal">$ </span><span className="text-foreground">git commit -m "feat: first commit"</span></div>
            <div className="text-terminal">[main a3f2b1c] feat: first commit</div>
            <div className="text-terminal">$ <span className="animate-pulse-glow">▊</span></div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <Zap className="w-8 h-8 text-amber mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground font-mono mb-3">No Setup Required</h2>
          <p className="text-muted-foreground mb-6">
            Git runs directly in your browser using WebAssembly. No downloads, no terminal setup, no Git installation.
            Perfect for classrooms and workshops.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
