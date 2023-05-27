
export const typesStatus = ['ativo', 'inativo'] as const;
export const typesVehicles = ['passeio', 'caminhao', 'carreta'] as const;
export const situacaoChecklist = ['bom', 'ruim']

export type TypesStatus = typeof typesStatus[number]
export type TypesVehicles = typeof typesVehicles[number]
export type SituacaoChecklist = typeof situacaoChecklist[number]