import React, {useState, useEffect} from "react";
import {STATUS_NEW} from "../constants/status-types";
import {PRIORITY_NEW, PRIORITIES_LIST} from "../constants/priority-types";
import {useDispatch} from "react-redux";
import {ADD_TICKET} from "../constants/action-types";

const AddTicketForm = () => {
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(PRIORITY_NEW);
    const [assignee, setAssignee] = useState('');
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const clearState = () => {
        setSummary('');
        setDescription('');
        setPriority(PRIORITY_NEW);
        setAssignee('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newTicket = {
            summary: summary,
            description: description,
            priority: priority,
            status: STATUS_NEW,
            assignee: assignee
        };

        const saveTicket = async (ticket) => {
            const fetchResponse = await fetch('http://0.0.0.0:3000/tasks', {
                method: 'POST',
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(ticket)
            });

            return await fetchResponse.json();
        };

        saveTicket(newTicket).then((ticket) => {
            dispatch({type: ADD_TICKET, payload: {...ticket}});
            clearState();
        }).catch(reason => console.log(reason.message));
    };

    useEffect(() => {
        const fetchAvailableUsers = async () => {
            const fetchResult = await fetch('http://0.0.0.0:3000/users', {
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type': 'application/json'}
            });
            const result = await fetchResult.json();
            setUsers(result.users);
        };

        fetchAvailableUsers();
    }, []);


    return (
        <div className="jumbotron">
            <h2>Add new ticket</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="summary">Summary</label>
                    <input
                        type="text"
                        className="form-control"
                        id="summary"
                        value={summary}
                        onChange={(event) => setSummary(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select value={priority} onChange={(event) => setPriority(event.target.value)} id="priority">
                        {PRIORITIES_LIST.map((priority) => (
                            <option key={priority} value={priority}>
                                {priority}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="assignee">Assignee</label>
                    <select value={assignee} onChange={(event) => setAssignee(event.target.value)} id="assignee">
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-success btn-lg">
                    SAVE
                </button>
            </form>
        </div>
    )
};

export default AddTicketForm;