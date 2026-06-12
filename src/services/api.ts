// ─── CONFIGURAÇÃO BASE ────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

// Salva/lê o token JWT no localStorage
export const token = {
  get: () => localStorage.getItem("token"),
  set: (t: string) => localStorage.setItem("token", t),
  clear: () => localStorage.removeItem("token"),
};

// Headers padrão com autenticação
function headers(auth = true): HeadersInit {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (auth) {
    const t = token.get();
    if (t) h["Authorization"] = `Bearer ${t}`;
  }
  return h;
}

// Wrapper genérico de fetch
async function req<T>(
  method: string,
  path: string,
  body?: unknown,
  auth = true
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: headers(auth),
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.erro ?? data.message ?? "Erro desconhecido");
  return data as T;
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

export const auth = {
  login: async (email: string, senha: string) => {
    const data = await req<{ token: string; usuario: Usuario }>(
      "POST", "/auth/login", { email, senha }, false
    );
    token.set(data.token);
    return data.usuario;
  },

  cadastrar: async (payload: {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
  }) => {
    const data = await req<{ token: string; usuario: Usuario }>(
      "POST", "/auth/registro", payload, false
    );
    token.set(data.token);
    return data.usuario;
  },

  logout: () => token.clear(),
};

// ─── DENÚNCIAS ────────────────────────────────────────────────────────────────
export interface Denuncia {
  id: number;
  tipo: string;
  descricao: string;
  bairro: string;
  cidade: string;
  status: string;
  criado_em: string;
}

export const denuncias = {
  // Cria denúncia com possíveis fotos (usa FormData, não JSON)
  criar: async (payload: {
    tipo: string;
    descricao: string;
    bairro?: string;
    cidade?: string;
    latitude?: number;
    longitude?: number;
    anonima?: boolean;
    fotos?: File[];
  }) => {
    const form = new FormData();
    form.append("tipo", payload.tipo);
    form.append("descricao", payload.descricao);
    if (payload.bairro) form.append("bairro", payload.bairro);
    if (payload.cidade) form.append("cidade", payload.cidade);
    if (payload.latitude != null) form.append("latitude", String(payload.latitude));
    if (payload.longitude != null) form.append("longitude", String(payload.longitude));
    form.append("anonima", payload.anonima ? "1" : "0");
    payload.fotos?.forEach((f) => form.append("fotos", f));

    const res = await fetch(`${BASE_URL}/denuncias`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token.get()}` }, // SEM Content-Type (FormData define sozinho)
      body: form,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erro ?? "Erro ao criar denúncia");
    return data as Denuncia;
  },

  minhas: () => req<Denuncia[]>("GET", "/denuncias/minhas"),
};

// ─── SOS ──────────────────────────────────────────────────────────────────────
export const sos = {
  disparar: async (latitude: number, longitude: number) => {
    return req<{ id: number }>("POST", "/sos", { latitude, longitude });
  },
};

// Adicione esta interface no seu src/services/api.ts
export interface Denuncia {
  id: string;
  usuario_id: string | null;
  tipo: 'assedio' | 'perseguicao' | 'violencia_fisica' | 'outro';
  descricao: string | null;
  latitude: number | null;
  longitude: number | null;
  bairro: string | null;
  cidade: string;
  status: 'pendente' | 'em_analise' | 'resolvido' | 'arquivado';
  anonima: number; // 0 para falsa, 1 para verdadeira
  criado_em: string;
  atualizado_em: string;
}