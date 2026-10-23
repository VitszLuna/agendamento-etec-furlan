import React, { useState } from 'react';
import { Search, Clock, ArrowRight, ChevronLeft } from 'lucide-react';
import { CATEGORIZED_SERVICES } from '../data/mockData';

/**
 * Catálogo de Serviços do Aluno (Fotos 1 e 2 da 2ª remessa)
 * Totalmente adaptado para acessibilidade com textos ampliados e botões confortáveis.
 */
export default function AlunoCatalogoServicos({
  aoSelecionarServico,
  aoNavegarParaInicio
}) {
  const [termoBusca, setTermoBusca] = useState('');

  // Filtra os serviços pelo termo digitado
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Botão de Retorno com Área de Clique Ampliada */}
      <button
        onClick={aoNavegarParaInicio}
        className="inline-flex items-center space-x-2 text-base font-bold text-slate-600 hover:text-slate-950 transition mb-6 py-2 px-3 rounded-lg hover:bg-slate-100 cursor-pointer"
      >
        <ChevronLeft size={22} className="text-slate-700" />
        <span>Início</span>
      </button>

      {/* Título e Subtítulo Acessíveis */}
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Qual serviço você precisa?
        </h2>
        <p className="text-slate-600 text-base sm:text-lg mt-2 font-medium">
          Escolha o serviço para ver detalhes e agendar seu atendimento.
        </p>
      </div>

      {/* Barra de Pesquisa Ampliada */}
      <div className="max-w-2xl mb-12">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={22} className="text-slate-400" />
          </div>
          <input
            type="text"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            placeholder="Buscar serviço, ex.: declaração, histórico, nota..."
            className="w-full pl-12 pr-5 py-4 bg-white border-2 border-slate-300 rounded-2xl text-base sm:text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent shadow-xs transition"
          />
        </div>
      </div>

      {/* Categorias e Cards */}
      {categoriasFiltradas.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <p className="text-slate-700 font-bold text-lg">
            Nenhum serviço encontrado para "{termoBusca}".
          </p>
          <button
            onClick={() => setTermoBusca('')}
            className="mt-4 px-6 py-2.5 bg-red-50 text-red-700 rounded-xl text-base font-bold hover:bg-red-100 cursor-pointer transition"
          >
            Limpar busca
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {categoriasFiltradas.map((categoria) => (
            <div key={categoria.category} className="space-y-4">
              
              <h3 className="text-sm font-extrabold tracking-wider text-slate-500 uppercase">
                {categoria.category}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {categoria.services.map((servico) => (
                  <div
                    key={servico.id}
                    onClick={() => aoSelecionarServico(servico)}
                    className="bg-white rounded-2xl border-2 border-slate-200/90 hover:border-red-400 p-6 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-red-700 transition">
                          {servico.title}
                        </h4>
                        {servico.requerResponsavel && (
                          <span className="text-xs font-extrabold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full flex-shrink-0">
                            Exige Responsável
                          </span>
                        )}
                      </div>
                      <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                        {servico.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-100 text-sm sm:text-base">
                      <div className="flex items-center space-x-2 text-slate-600 font-medium">
                        <Clock size={18} className="text-red-700" />
                        <span>{servico.duration}</span>
                      </div>

                      <div className="flex items-center space-x-1 font-bold text-red-700 group-hover:text-red-800 transition">
                        <span>Ver serviço</span>
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
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
