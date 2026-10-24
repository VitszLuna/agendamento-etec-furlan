import React, { useState } from 'react';
import { Search, Clock, ArrowRight, ChevronLeft } from 'lucide-react';
import { CATEGORIZED_SERVICES } from '../data/mockData';

export default function AlunoCatalogoServicos({
  aoSelecionarServico,
  aoNavegarParaInicio
}) {
  const [termoBusca, setTermoBusca] = useState('');

  const categoriasFiltradas = CATEGORIZED_SERVICES.map((cat) => {
    const servicosCorrespondentes = cat.services.filter((svc) => {
      const q = termoBusca.toLowerCase().trim();
      return (
        svc.title.toLowerCase().includes(q) ||
        svc.description.toLowerCase().includes(q)
      );
    });
    return {
      ...cat,
      services: servicosCorrespondentes
    };
  }).filter((cat) => cat.services.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <button
        onClick={aoNavegarParaInicio}
        className="inline-flex items-center space-x-2 text-sm sm:text-base font-bold text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100 transition mb-4 sm:mb-6 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
      >
        <ChevronLeft size={20} />
        <span>Início</span>
      </button>

      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Qual serviço você precisa?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg mt-1.5 sm:mt-2 font-medium">
          Escolha o serviço para ver detalhes e agendar seu atendimento.
        </p>
      </div>

      <div className="max-w-2xl mb-8 sm:mb-12">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={20} className="text-slate-400" />
          </div>
          <input
            type="text"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            placeholder="Buscar serviço, ex.: declaração, histórico, nota..."
            className="w-full pl-11 sm:pl-12 pr-4 sm:pr-5 py-3 sm:py-4 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-2xl text-sm sm:text-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-transparent shadow-xs transition"
          />
        </div>
      </div>

      {categoriasFiltradas.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center shadow-xs">
          <p className="text-slate-700 dark:text-slate-300 font-bold text-base sm:text-lg">
            Nenhum serviço encontrado para "{termoBusca}".
          </p>
          <button
            onClick={() => setTermoBusca('')}
            className="mt-4 px-5 sm:px-6 py-2.5 bg-red-50 dark:bg-red-950/60 text-[#b91c1c] dark:text-red-300 rounded-xl text-sm sm:text-base font-bold hover:bg-red-100 dark:hover:bg-red-950 cursor-pointer transition"
          >
            Limpar busca
          </button>
        </div>
      ) : (
        <div className="space-y-8 sm:space-y-12">
          {categoriasFiltradas.map((categoria) => (
            <div key={categoria.category} className="space-y-3 sm:space-y-4">
              <h3 className="text-xs sm:text-sm font-extrabold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                {categoria.category}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {categoria.services.map((servico) => (
                  <div
                    key={servico.id}
                    onClick={() => aoSelecionarServico(servico)}
                    className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200/90 dark:border-slate-800 hover:border-red-400 dark:hover:border-red-800 p-4 sm:p-6 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h4 className="text-base sm:text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#b91c1c] dark:group-hover:text-red-400 transition">
                          {servico.title}
                        </h4>
                        {servico.requerResponsavel && (
                          <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 flex-shrink-0">
                            Exige Responsável
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-base mt-2 line-clamp-2">
                        {servico.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center space-x-1.5">
                        <Clock size={16} className="text-slate-400" />
                        <span>{servico.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1 font-bold text-[#b91c1c] dark:text-red-400 group-hover:translate-x-1 transition-transform">
                        <span>Ver detalhes</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
