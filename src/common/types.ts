
export const typesStatus = ['ativo', 'inativo'] as const;
export const typesVehicles = ['passeio', 'caminhonete', 'caminhao', 'carreta', 'van'] as const;
export const situacaoChecklist = ['bom', 'ruim']
export const typesChecklist = ['entrada', 'saida']

export type TypesStatus = typeof typesStatus[number]
export type TypesVehicles = typeof typesVehicles[number]
export type SituacaoChecklist = typeof situacaoChecklist[number]
export type TypeChecklist = typeof typesChecklist[number]