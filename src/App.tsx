import { push } from 'connected-react-router'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import { fetchList } from './action'
import logo from './logo.svg'

const mapStateToProps = (storeState: IStoreState) => ({
  list: storeState.list,
})
const mapDispatchToProps = {
  fetchList,
  push,
}

type IStateProps = ReturnType<typeof mapStateToProps>
type IDispatchProps = typeof mapDispatchToProps
type IProps = IStateProps & IDispatchProps

class App extends Component<IProps> {

  componentDidMount() {
    this.props.fetchList()
  }

  navigateToEditor = (id?: number) => () => this.props.push(`/edit/${id}`)

  render() {
    const { list = [] } = this.props
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to CheckList</h1>
        </header>
        <ul>
          {
            list.map((item) => (
              <li
                key={item.content}
                onClick={this.navigateToEditor(item.id)}
              >
                {item.isChecked ? '完成' : '未完成'} - {item.content}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default connect<IStateProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(App)
