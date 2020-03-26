
declare interface IDraftState {
  id: number
  isChecked: boolean
  content: string
}

declare type IList = IDraftState[]

declare interface IStoreState {
  route: {
    location: Location
  },
  draft: {
    [id: number]: IDraftState
  }
  list: IList
}
