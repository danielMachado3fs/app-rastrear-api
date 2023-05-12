
export const tiposStatus = ['ativo', 'inativo'] as const;
export const tiposVeiculos = ['passeio', 'caminhao', 'carreta'] as const;

export type TiposStatus = typeof tiposStatus[number]
export type TiposVeiculos = typeof tiposVeiculos[number]