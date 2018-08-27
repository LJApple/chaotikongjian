import * as types from './mutation-types'
const mutations = {
    [types.SET_TASK_LIST_DETAIL](state, taskListDetail) {
        state.taskListDetail = taskListDetail
    },
    [types.LOGIN]: (state, account_token) => {
        localStorage.account_token = account_token
        state.account_token = account_token
    },
    [types.LOGOUT]: (state) => {
        localStorage.removeItem('account_token')
        state.account_token = null
    }
}
export default mutations