import {ADD_TICKET, LOAD_TICKETS, CHANGE_ASSIGNEE, CHANGE_STATUS, LOAD_USERS} from "../constants/action-types";

import {STATUS_NEW, STATUS_PROGRESS, STATUS_REVIEW, STATUS_DONE} from "../constants/status-types";

const initialState = {
    tickets: {
        [STATUS_NEW]: {},
        [STATUS_PROGRESS]: {},
        [STATUS_REVIEW]: {},
        [STATUS_DONE]: {},
    },
    users: []
};

/**
 * Main reducer
 *
 * @param state
 * @param action
 * @returns {{tickets: {}, users: Array}|({} & {tickets: {}, users: Array} & {tickets: {[p: string]: *}})|({} & {tickets: {}, users: Array})}
 */
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TICKET :
            let addedTicket = {
                [action.payload.task.id]: action.payload.task
            };

            return Object.assign({}, state, {
                tickets: {
                    [STATUS_NEW]: Object.assign({}, state.tickets[STATUS_NEW], addedTicket),
                    [STATUS_PROGRESS]: state.tickets[STATUS_PROGRESS],
                    [STATUS_REVIEW]: state.tickets[STATUS_REVIEW],
                    [STATUS_DONE]: state.tickets[STATUS_DONE],
                }
            });
        case LOAD_TICKETS :
            let newState = Object.assign({}, state);

            let newTickets = action.payload.tickets.reduce((obj, item) => {
                obj[item.id] = item;
                return obj
            }, {});

            newState.tickets[action.payload.status] = Object.assign({}, state.tickets[action.payload.status], newTickets);

            return newState;
        case CHANGE_STATUS :
            let changeStatusState = Object.assign({}, state);
            let ticket = Object.assign(
                {},
                changeStatusState.tickets[action.payload.prevStatus][action.payload.ticket.id],
                {status: action.payload.status}
            );

            changeStatusState.tickets[action.payload.status] = Object.assign(
                {},
                changeStatusState.tickets[action.payload.status],
                {[ticket.id]: ticket}
            );

            delete changeStatusState.tickets[action.payload.prevStatus][ticket.id];
            changeStatusState.tickets[action.payload.prevStatus] = Object.assign({}, changeStatusState.tickets[action.payload.prevStatus]);

            return changeStatusState;
        case CHANGE_ASSIGNEE :
            let changeAssigneeState = Object.assign({}, state);
            changeAssigneeState.tickets[action.payload.ticket.status][action.payload.ticket.id].user = action.payload.assignee;

            return changeAssigneeState;
        case LOAD_USERS :
            let loadUsersState = Object.assign({}, state);
            loadUsersState.users = action.payload;

            return loadUsersState;
        default:
            return state;
    }
}

export default rootReducer;