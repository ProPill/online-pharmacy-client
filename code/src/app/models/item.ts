export interface IItem
{
  id: number
  title:string
  manufacturer: string
  recipeOnly: boolean
  special: boolean
  specialityId: number | null
  cost: number
  image: string
}
