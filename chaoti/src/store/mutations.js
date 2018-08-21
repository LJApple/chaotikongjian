import * as types from './mutation-types'
const mutations = {
    [types.SET_TASK_LIST_DETAIL](state, taskListDetail) {
        state.taskListDetail = taskListDetail
    }
}
export default mutations