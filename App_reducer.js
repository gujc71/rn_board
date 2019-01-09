import { createAction, handleActions } from 'redux-actions';

// action type
const BOARD_SAVE = 'SAVE';
const BOARD_REMOVE = 'REMOVE';
const BOARD_READ = 'READ';
const BOARD_LIST = 'LIST';

export const board_save = createAction(BOARD_SAVE);
export const board_remove = createAction(BOARD_REMOVE, brdno => brdno);
export const board_read = createAction(BOARD_READ);
export const board_list = createAction(BOARD_LIST);

const initialState = {
    maxNo: 3,    
    boards: [
            {
                brdno: 1,
                brdwriter: 'Lee SunSin',
                brdtitle: 'If you intend to live then you die',
                brddate: new Date()
            },
            {
                brdno: 2,
                brdwriter: 'So SiNo',
                brdtitle: 'Founder for two countries',
                brddate: new Date()
            }    
    ],
    selectedBoard: {}
};

initialBoard = {
    brdno: "",
    brdtitle: "",
    brdwriter: "",
    brddate: ""
};

export default handleActions({
    [BOARD_SAVE]: (state, { payload: data }) => {
        let boards = state.boards;
        if (!data.brdno) {                                              // new : Insert
            let maxNo = state.maxNo;
            return {maxNo: maxNo+1, boards: boards.concat({...data, brdno:maxNo, brddate: new Date()}), selectedBoard: initialBoard };
        } else {                                                        // Update
            return {...state, boards: boards.map(row => data.brdno === row.brdno ? {...data }: row), selectedBoard: initialBoard };
        }    
    },
    [BOARD_REMOVE]: (state, { payload: brdno }) => {
        let boards = state.boards;
        return {...state, boards: boards.filter(row => row.brdno !== brdno), selectedBoard: initialBoard };
    },
    [BOARD_READ]: (state, { payload: brdno }) => {
        let boards = state.boards;
        let board = boards.find(row => row.brdno === brdno) ;
        return {...state, selectedBoard: board?board:initialBoard };
    }
}, initialState);
