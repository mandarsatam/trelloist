import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { getSubTask, updateSubTask } from '../../../Redux/action';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';



const TodoSubCard = ({title, status, list, board, task, _id}) => {
    const [subTaskStatus, setSubTaskStatus] = React.useState(status);

    const dispatch = useDispatch();

    const handleSubTaskEdit = (checked) => {
        setSubTaskStatus(checked);
        const updateObj ={
            id : _id,
            status: checked
        }
        const action = updateSubTask(updateObj);
        dispatch(action)
        .then(res =>{
            if(res.success){
                dispatch(getSubTask({board}));
            }
        })
    }


    return (
        <div className="subtask_card">
            <Checkbox checked={subTaskStatus} onChange={(e) => handleSubTaskEdit(e.target.checked)} />
            <Typography>{title}</Typography>
        </div>
    )
}

export { TodoSubCard }
