import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import LearnPage from "./pages/LearnPage";
import PlayPage from "./pages/Play";
import WidgetPage from "./pages/WidgetPage";
import Teach from "./pages/Teach";
import Progress from "./pages/Progress";
import CheatSheet from "./pages/CheatSheet";
import QuizPage from "./pages/Quiz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:pageId" element={<LearnPage />} />
          <Route path="/play" element={<PlayPage />} />
          <Route path="/play/:widgetId" element={<WidgetPage />} />
          <Route path="/teach" element={<Teach />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/cheatsheet" element={<CheatSheet />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
