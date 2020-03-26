
import React, { ChangeEventHandler, Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { editDraftAction, fetchItemById, saveDraftAction } from './action'
import { NEW_DRAFT_SYMBOL } from './reducer/draft'

const mapStateToProps = (storeState: IStoreState) => ({
  draft: storeState.draft,
})
const mapDispatchToProps = {
  editDraftAction,
  saveDraftAction,
  fetchItemById
}
type IStateProps = ReturnType<typeof mapStateToProps>
type IDispatchProps = typeof mapDispatchToProps
type IProps = IStateProps & IDispatchProps & RouteComponentProps<{id?: string}>

// interface IState {
//   isChecked: boolean
//   content: string
// }

class Edit extends Component<IProps> {

  get draft() {
    // const id: number = +(this.props.match.params.id || 0)
    // console.log(id, 'id')
    // console.log(this.props.draft)
    // return this.props.draft[id || NEW_DRAFT_SYMBOL]
    return this.props.draft[this.props.match.params.id || NEW_DRAFT_SYMBOL]
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (typeof id === 'number') {
      this.props.fetchItemById(id)
    }
  }

  onCheckboxValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    this.props.editDraftAction({
      ...this.draft,
      isChecked: e.target.checked,
    })
  }

  onContentValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    this.props.editDraftAction({
      ...this.draft,
      content: e.target.value,
    })
  }

  onSave = () => {
    this.props.saveDraftAction(this.draft.id)
  }

  render() {
    const draft = this.draft
    if (!draft) {
      return null
    }
    return (
      <div>
        <div>
          <input
            type="checkbox"
            checked={draft.isChecked}
            onChange={this.onCheckboxValueChange}
          />
          <input
            type="text"
            value={draft.content}
            onChange={this.onContentValueChange}
          />
        </div>
        <div>
          <button>取消</button>
          <button onClick={this.onSave}>确定</button>
        </div>
      </div>
    )
  }
}

export default connect<IStateProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(Edit)