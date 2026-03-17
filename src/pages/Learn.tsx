import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import { learnPages } from '@/lib/learn-content';

export default function Learn() {
  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground font-mono mb-2">Learn Git</h1>
        <p className="text-muted-foreground mb-8">10 visual lessons from the basics to branching & merging.</p>

        <div className="space-y-3">
          {learnPages.map((page, i) => (
            <motion.div key={page.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
              <Link
                to={`/learn/${page.id}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-terminal/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-terminal/10 text-terminal flex items-center justify-center font-mono font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-foreground font-bold truncate">{page.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{page.subtitle}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-terminal transition-colors shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
