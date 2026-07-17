// Starter model catalog — verified repos from dhruva-app's
// orchestra/research/hf-api.md (Hugging Face API verification pass, Loop 0).
// RAM tiers mirror the app's actual verdict algorithm in
// app/lib/core/device_info/model_tier.dart: the floor is picked by the
// quantized file's *size bucket*, not by parameter count directly.

export interface StarterModel {
  name: string;
  repo: string;
  role: 'Chat' | 'Vision' | 'Embedding';
  quant: string;
  approxSize: string;
  ramFloor: string;
  useCase: string;
}

export const STARTER_MODELS: StarterModel[] = [
  {
    name: 'Llama-3.2-1B-Instruct',
    repo: 'bartowski/Llama-3.2-1B-Instruct-GGUF',
    role: 'Chat',
    quant: 'Q4_K_M',
    approxSize: '~770 MB',
    ramFloor: '4 GB+',
    useCase: 'Chat, summarization — best instruction-following at this size',
  },
  {
    name: 'Qwen2.5-1.5B-Instruct',
    repo: 'bartowski/Qwen2.5-1.5B-Instruct-GGUF',
    role: 'Chat',
    quant: 'Q4_K_M',
    approxSize: '~986 MB',
    ramFloor: '4 GB+',
    useCase: 'Conversational, multilingual, balanced',
  },
  {
    name: 'SmolLM2-1.7B-Instruct',
    repo: 'bartowski/SmolLM2-1.7B-Instruct-GGUF',
    role: 'Chat',
    quant: 'Q4_K_M',
    approxSize: '~1.0 GB',
    ramFloor: '4 GB+',
    useCase: 'Efficient, maths-capable — coding and reasoning',
  },
  {
    name: 'Llama-3.2-3B-Instruct',
    repo: 'bartowski/Llama-3.2-3B-Instruct-GGUF',
    role: 'Chat',
    quant: 'Q4_K_M',
    approxSize: '~1.9 GB',
    ramFloor: '6 GB+',
    useCase: 'Better reasoning for complex tasks and analysis',
  },
  {
    name: 'Phi-4-mini-instruct',
    repo: 'unsloth/Phi-4-mini-instruct-GGUF',
    role: 'Chat',
    quant: 'Q4_K_M',
    approxSize: '~2.4 GB',
    ramFloor: '6 GB+',
    useCase: 'Reliable, well-tuned — research-backed',
  },
  {
    name: 'SmolVLM2-2.2B-Instruct',
    repo: 'ggml-org/SmolVLM2-2.2B-Instruct-GGUF',
    role: 'Vision',
    quant: 'Q4_K_M + mmproj-Q8_0',
    approxSize: '~1.6 GB total',
    ramFloor: '6 GB+',
    useCase: 'Photo and screenshot understanding',
  },
  {
    name: 'All-MiniLM-L6-v2',
    repo: 'second-state/All-MiniLM-L6-v2-Embedding-GGUF',
    role: 'Embedding',
    quant: 'GGUF',
    approxSize: '~20 MB',
    ramFloor: 'negligible',
    useCase: 'Document search and RAG — always paired with a chat model',
  },
];
