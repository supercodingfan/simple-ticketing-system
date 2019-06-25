import {ADD_TICKET} from "../constants/action-types";
import {CHANGE_STATUS} from "../constants/action-types";

import {STATUS_NEW} from "../constants/status-types";
import {STATUS_PROGRESS} from "../constants/status-types";
import {STATUS_REVIEW} from "../constants/status-types";
import {STATUS_DONE} from "../constants/status-types";

const initialState = {
    tickets: {
        [STATUS_NEW]: [],
        [STATUS_PROGRESS]: [],
        [STATUS_REVIEW]: [],
        [STATUS_DONE]: [],
    }
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TICKET :
            return Object.assign({}, state, {
                tickets: {
                    [STATUS_NEW]: state.tickets[STATUS_NEW].concat(action.payload),
                    [STATUS_PROGRESS]: state.tickets[STATUS_PROGRESS],
                    [STATUS_REVIEW]: state.tickets[STATUS_REVIEW],
                    [STATUS_DONE]: state.tickets[STATUS_DONE],
                }
            });
        case CHANGE_STATUS :
            let newStatus = action.payload.ticket_status;

            let mergedTickets = Object.assign({}, state.tickets, {
                [newStatus]: state.tickets[newStatus].concat(action.payload)
            });

            return Object.assign({}, state, {
                tickets: mergedTickets
            });
        default:
            return state;
    }
}

export default rootReducer;