import React, { useState, useEffect } from 'react';
import { Brain, Check, Loader2, ArrowRight, ShieldAlert } from 'lucide-react';

interface ProvisioningPageProps {
  workspaceName: string;
  industryName: string;
  onFinished: () => void;
}

interface Step {
  id: number;
  label: string;
  status: 'idle' | 'loading' | 'completed';
}

export default function ProvisioningPage({ workspaceName, industryName, onFinished }: ProvisioningPageProps) {
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, label: '创建企业空间与隔离沙箱', status: 'idle' },
    { id: 2, label: '配置租户独立数据库实例', status: 'idle' },
    { id: 3, label: '自动装配行业业务控制后台', status: 'idle' },
    { id: 4, label: '构建细粒度默认角色系统', status: 'idle' },
    { id: 5, label: '分配安全权限访问密钥令牌', status: 'idle' },
    { id: 6, label: '激活专有行业领域领域AI团队', status: 'idle' },
    { id: 7, label: '编排并连通底层系统工作流', status: 'idle' },
    { id: 8, label: '灌装及同步行业默认专有知识库', status: 'idle' },
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (currentStepIndex < steps.length) {
      // Set current step to loading
      setSteps(prev => prev.map((s, idx) => {
        if (idx === currentStepIndex) return { ...s, status: 'loading' };
        return s;
      }));

      const timer = setTimeout(() => {
        // Mark current step as completed
        setSteps(prev => prev.map((s, idx) => {
          if (idx === currentStepIndex) return { ...s, status: 'completed' };
          return s;
        }));
        
        setCurrentStepIndex(prev => prev + 1);
      }, 500); // 500ms per step to feel snappy yet high-tech and authentic

      return () => clearTimeout(timer);
    } else {
      setIsDone(true);
      // Auto-transition to next screen after 800ms
      const finalTimer = setTimeout(() => {
        onFinished();
      }, 1000);
      return () => clearTimeout(finalTimer);
    }
  }, [currentStepIndex]);

  return (
    <div id="provisioning-page-root" className="bg-slate-950 min-h-screen text-slate-100 font-sans flex flex-col justify-between overflow-x-hidden relative">
      
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>

      {/* HEADER */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-slate-900 bg-slate-950/80 backdrop-blur">
        <div className="flex items-center gap-2 select-none">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold tracking-wider text-white">AI BUSINESS OS</span>
        </div>
      </header>

      {/* CORE FRAME FOR LOGS */}
      <main className="flex-1 w-full max-w-lg mx-auto flex flex-col justify-center px-6 py-12 space-y-6">
        
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono text-indigo-400 font-bold tracking-widest uppercase">PAGE 005 / INITIALIZING WORKSPACE</span>
          <h1 className="text-2xl font-bold text-white tracking-tight">正在创建企业空间</h1>
          <p className="text-xs text-slate-400 font-mono">
            企业: <span className="text-slate-205 font-bold">{workspaceName}</span> | 行业: <span className="text-indigo-400 font-bold">{industryName}</span>
          </p>
        </div>

        {/* Real-time Dynamic Provisioning Queue */}
        <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 shadow-2xl space-y-3 font-mono text-xs">
          {steps.map((step) => {
            return (
              <div 
                key={step.id} 
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border transition-all duration-300 ${
                  step.status === 'completed' 
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' 
                    : step.status === 'loading'
                      ? 'bg-indigo-500/5 border-indigo-500/30 text-indigo-300 font-bold'
                      : 'bg-slate-950/40 border-slate-900 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {step.status === 'completed' ? (
                    <span className="text-emerald-400 font-bold">✓</span>
                  ) : step.status === 'loading' ? (
                    <Loader2 className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                  ) : (
                    <span className="text-slate-700 select-none">○</span>
                  )}
                  <span>{step.label}</span>
                </div>

                <span className="text-[10px] font-bold uppercase select-none">
                  {step.status === 'completed' ? (
                    <span className="text-emerald-405">已就绪</span>
                  ) : step.status === 'loading' ? (
                    <span className="text-indigo-401 animate-pulse">配置中</span>
                  ) : (
                    <span className="text-slate-700">等待</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* Transition trigger button if it doesn't auto jump */}
        {isDone && (
          <button
            onClick={onFinished}
            className="w-full bg-emerald-600 hover:bg-emerald-550 text-white font-bold text-xs py-3.5 rounded-xl shadow transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 animate-slide-up"
          >
            <span>配置完成，立即进入商家控制台</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

      </main>

      {/* FOOTER */}
      <footer className="py-6 border-t border-slate-900 text-center text-[10px] font-mono text-slate-600 bg-slate-950">
        AI BUSINESS OS © 2026. REAL-TIME MULTI-TENANCY BLUEPRINT HYBRID INJECTION.
      </footer>

    </div>
  );
}
