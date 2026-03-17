import { Link, useLocation } from 'react-router-dom';
import { GitBranch, BookOpen, Play, Users, Trophy, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/learn', label: 'Learn', icon: BookOpen },
  { path: '/play', label: 'Play', icon: Play },
  { path: '/teach', label: 'Teach', icon: Users },
  { path: '/progress', label: 'Progress', icon: Trophy },
];

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground font-mono font-bold text-lg">
            <GitBranch className="w-5 h-5 text-terminal" />
            <span>Git<span className="text-terminal">Visual</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-mono transition-colors ${
                  location.pathname.startsWith(item.path)
                    ? 'bg-terminal/10 text-terminal'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="md:hidden border-t border-border p-2 space-y-1 bg-background">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-mono ${
                  location.pathname.startsWith(item.path) ? 'bg-terminal/10 text-terminal' : 'text-muted-foreground'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}
