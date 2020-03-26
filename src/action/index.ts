

import { push } from 'connected-react-router'
import { ThunkAction } from 'redux-thunk'
import { NEW_DRAFT_SYMBOL } from '../reducer/draft'

const headers = new Headers({ 'content-type': 'application/json' })

export const EDIT_DRAFT_ACTION_TYPE = 'draft/edit'
export const editDraftAction = (payload: IDraftState) => ({
  type: EDIT_DRAFT_ACTION_TYPE,
  payload,
})

export const RESET_DRAFT_ACTION_TYPE = 'draft/reset'
export const restDraftAction = (id: number) => ({
  type: RESET_DRAFT_ACTION_TYPE,
  payload: { id }
})

export const SAVE_DRAFT_ACTION_TYPE = 'draft/save'
// export const saveDraftAction = () => ({
//   type: SAVE_DRAFT_ACTION_TYPE,
// })
// tslint:disable-next-line: no-any
export const saveDraftAction = (id: number): ThunkAction<void, IStoreState, undefined, any> => (dispatch, getState) => {
  const draft = getState().draft[id]
  if (id === NEW_DRAFT_SYMBOL) {
    fetch('http://localhost:3000/work-items', {
      headers,
      method: 'post',
      body: JSON.stringify(draft),
    }).then(() => {
      dispatch(push('/'))
      dispatch(restDraftAction(id))
    })
  } else {
    fetch(`http://localhost:3000/work-items/${id}`, {
      headers,
      method: 'put',
      body: JSON.stringify(draft),
    }).then(() => {
      dispatch(push('/'))
      dispatch(restDraftAction(id))
    })
  }
}


/**
 * 获取列表
 */

export const FETCH_LIST_SUCCESS_TYPE = 'list/success'
export const fetchListSuccess = (payload: IList) => ({
  type: FETCH_LIST_SUCCESS_TYPE,
  payload
})

// tslint:disable-next-line: no-any
export const fetchList = (): ThunkAction<void, IStoreState, undefined, any> => async (dispatch) => {
  const response = await fetch('http://localhost:3000/work-items', { headers })
  const data = await response.json()
  dispatch(fetchListSuccess(data))
}

// tslint:disable-next-line: no-any
export const fetchItemById = (id: number): ThunkAction<void, IStoreState, undefined, any> => async (dispatch) => {
  const response = await fetch(`http://localhost:3000/work-items/${id}`, { headers })
  const data = await response.json()
  dispatch(editDraftAction(data))
}
