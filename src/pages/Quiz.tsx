import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import { quizQuestions, saveQuizResult } from '@/lib/quiz-data';

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  const shuffled = useMemo(() => [...quizQuestions].sort(() => Math.random() - 0.5), []);
  const question = shuffled[currentIndex];
  const isCorrect = selectedOption === question?.correctIndex;

  const score = useMemo(() => {
    return Object.entries(answers).filter(
      ([id, ans]) => shuffled.find(q => q.id === id)?.correctIndex === ans
    ).length;
  }, [answers, shuffled]);

  const handleSelect = (optionIndex: number) => {
    if (revealed) return;
    setSelectedOption(optionIndex);
    setRevealed(true);
    setAnswers(prev => ({ ...prev, [question.id]: optionIndex }));
  };

  const handleNext = () => {
    if (currentIndex + 1 >= shuffled.length) {
      const finalScore = Object.entries({ ...answers }).filter(
        ([id, ans]) => shuffled.find(q => q.id === id)?.correctIndex === ans
      ).length;
      saveQuizResult({
        score: finalScore,
        total: shuffled.length,
        completedAt: new Date().toISOString(),
        answers,
      });
      setFinished(true);
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setRevealed(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setSelectedOption(null);
    setRevealed(false);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / shuffled.length) * 100);
    return (
      <SiteLayout>
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <Trophy className={`w-16 h-16 mx-auto mb-4 ${pct >= 70 ? 'text-terminal' : 'text-amber'}`} />
            <h1 className="text-3xl font-bold text-foreground font-mono mb-2">Quiz Complete!</h1>
            <p className="text-5xl font-bold font-mono mb-2" style={{ color: pct >= 70 ? 'hsl(var(--terminal))' : 'hsl(var(--amber))' }}>
              {score}/{shuffled.length}
            </p>
            <p className="text-muted-foreground mb-8">{pct}% correct — {pct >= 90 ? 'Outstanding!' : pct >= 70 ? 'Great job!' : pct >= 50 ? 'Good effort, keep practicing!' : 'Review the lessons and try again!'}</p>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-terminal/10 text-terminal hover:bg-terminal/20 font-mono text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
          </motion.div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground font-mono">Quiz</h1>
          <span className="text-sm text-muted-foreground font-mono">
            {currentIndex + 1} / {shuffled.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-muted rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-terminal rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + (revealed ? 1 : 0)) / shuffled.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-muted text-muted-foreground">{question.topic}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                question.difficulty === 'beginner' ? 'bg-terminal/10 text-terminal' : 'bg-amber/10 text-amber'
              }`}>{question.difficulty}</span>
            </div>
            <h2 className="text-lg font-bold text-foreground mb-6">{question.question}</h2>

            <div className="space-y-3">
              {question.options.map((opt, i) => {
                let borderClass = 'border-border hover:border-terminal/30';
                if (revealed) {
                  if (i === question.correctIndex) borderClass = 'border-terminal bg-terminal/5';
                  else if (i === selectedOption) borderClass = 'border-destructive bg-destructive/5';
                  else borderClass = 'border-border opacity-50';
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={revealed}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 bg-card ${borderClass}`}
                  >
                    <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs font-mono shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm text-foreground">{opt}</span>
                    {revealed && i === question.correctIndex && <CheckCircle2 className="w-4 h-4 text-terminal ml-auto shrink-0" />}
                    {revealed && i === selectedOption && i !== question.correctIndex && <XCircle className="w-4 h-4 text-destructive ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>

            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <div className={`p-4 rounded-xl border ${isCorrect ? 'border-terminal/20 bg-terminal/5' : 'border-amber/20 bg-amber/5'}`}>
                  <p className="text-sm font-bold mb-1" style={{ color: isCorrect ? 'hsl(var(--terminal))' : 'hsl(var(--amber))' }}>
                    {isCorrect ? '✅ Correct!' : '❌ Not quite!'}
                  </p>
                  <p className="text-xs text-muted-foreground">{question.explanation}</p>
                </div>
                <button
                  onClick={handleNext}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-terminal/10 text-terminal hover:bg-terminal/20 font-mono text-sm transition-colors"
                >
                  {currentIndex + 1 >= shuffled.length ? 'See Results' : 'Next'} <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </SiteLayout>
  );
}
