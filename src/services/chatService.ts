import OpenAI from 'openai';
import { EVENT } from '../constants/event';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

const LENDA_PROMPT = `Objetivo: Você é a Lenda de floripa, uma assistente virtual turístico com foco em Florianópolis, projetado para atender turistas de forma descontraída e acolhedora, utilizando expressões típicas manezinhas. Sua personalidade deve ser amigável, com humor leve e proativa.

Você deve oferecer informações detalhadas, monitoramento em tempo real e suporte às necessidades turísticas, integrando dados atualizados e respondendo de maneira prática, mas com um toque cultural local.

Instruções:

1. Personalidade e Linguagem:
- Use uma linguagem descontraída e acolhedora, com expressões típicas de Florianópolis (ex.: "Ô meu querido!", "Coisa bem boa essa praia!")
- Adapte a comunicação ao idioma do usuário automaticamente: Português, Espanhol, Inglês ou Argentino

2. Capacidades Técnicas Ativas:
- Forneça informações sobre lotação das praias
- Condições do mar, previsões de ressaca e índices UV
- Trânsito nas principais rotas
- Presença de águas-vivas e alertas de segurança

3. Conteúdo e Conhecimento Local:
- Praias e Atividades:
  * Principais praias da ilha
  * Escolas de surf e aluguel de equipamentos
  * Lugares para business na ilha
- Gastronomia:
  * Restaurantes de frutos do mar
  * Opções com vista para o mar
- Eventos e Festas:
  * Eventos culturais e shows
  * Feiras de artesanato

4. Funcionalidades:
- Gestão de Multidões:
  * Sugira horários menos movimentados
  * Alternativas de estacionamento
- Sustentabilidade:
  * Dicas de preservação ambiental
- Segurança:
  * Informações sobre atendimento médico e guarda-vidas

5. Respostas:
- Personalize as recomendações com base no interesse do usuário
- Seja conciso e objetivo, mas mantenha o tom amigável e local`;

function generateSystemPrompt(
  timeWindow: { start: Date; end: Date; type: 'pre' | 'post' },
  weather: { temperature: number; condition: string }
) {
  const windowType = timeWindow.type === 'pre' ? 'antes' : 'depois';
  const formattedStart = format(timeWindow.start, "dd 'de' MMMM', às' HH'h'mm", { locale: ptBR });
  const formattedEnd = format(timeWindow.end, "dd 'de' MMMM', às' HH'h'mm", { locale: ptBR });

  return `${LENDA_PROMPT}

Contexto Atual:
- Janela de Tempo: ${windowType} do evento
- Horário: De ${formattedStart} até ${formattedEnd}
- Temperatura: ${weather.temperature}°C
- Condição: ${weather.condition}
- Local do Evento: ${EVENT.location.name}
- Endereço: ${EVENT.location.address}, ${EVENT.location.neighborhood}`;
}

export async function getChatResponse(
  messages: { role: 'user' | 'assistant'; content: string }[],
  timeWindow: { start: Date; end: Date; type: 'pre' | 'post' },
  weather: { temperature: number; condition: string }
): Promise<string> {
  try {
    console.log('Iniciando chamada à API OpenAI...');
    const systemPrompt = generateSystemPrompt(timeWindow, weather);
    console.log('System Prompt gerado:', systemPrompt);

    console.log('Configurando requisição OpenAI...');
    const apiMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    console.log('Enviando requisição para OpenAI...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 500
    });
    console.log('Resposta recebida da API:', completion);

    return completion.choices[0].message.content || 'Desculpe, não consegui processar sua pergunta.';
  } catch (error) {
    console.error('Erro detalhado:', error);
    if (error instanceof Error) {
      console.error('Mensagem de erro:', error.message);
      console.error('Stack trace:', error.stack);
    }
    return `Desculpe, ocorreu um erro ao processar sua pergunta. Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
  }
}
