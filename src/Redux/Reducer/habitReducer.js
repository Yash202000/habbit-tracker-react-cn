
// redux toolkit functions to create slice and async thunk
import { createSlice } from "@reduxjs/toolkit";




const initialState = { 
                    habits:[],
                    suggestionSelected:null,
                    showStatus:null,
                    displayImageUrl:'' 
                }




// creating Slice to create reducer and extraReducer
const habitSlice = createSlice({
    name:'habitTracker',
    initialState,
    reducers:{
        // add a new habit to Habits array
        addHabit:(state,action) => {
            state.habits = [...state.habits,action.payload];
            state.showStatus = null;
        },
        /* if user click on a habit suggestion add it inside the value of variable so that 
           later it can be added in input tag of "ADD HABIT" section */
        setSuggestionSelected:(state,action)=> {
            // store the habit
            state.suggestionSelected = action.payload;
        },
        // to show stats of a habit when user click on a habit from his selected habit list
        setShowStatus:(state,action) => {
            // store the habit
            state.showStatus = action.payload;
        },
        // toggle the status of a habit on a specific day
        //  done , not done , pending 
        toggleHabitStatus:(state,action) => {
            // getting values passed in the function 
            // habitIndex = index of habit 
            // dayIndex = index of day
            // status = status of the habit {true = done, false = not done, null = pending}
            const {habitIndex,dayIndex,status} = action.payload;
            
            // this function works in case of "screen below medium width"
            // if showStaus doesn't has the current click habit then store the habit from habit list
            if(state.showStatus === null){
                state.showStatus = state.habits[habitIndex];
            }

            // if the passed status if true, set habit as done
            if(status){
                // if already done then return
                if(state.showStatus.weekStatus[dayIndex]){
                    return;
                }
                // increase the number of days on which task is done
                state.showStatus.completedDays++;
            }
            // if the passed status is false, set habit as not done
            else if( status === false){
                // if already not done, return
                if(state.showStatus.weekStatus[dayIndex] === false){
                    return;
                }
                // if the task was previously done
                else if(state.showStatus.weekStatus[dayIndex]){
                    // decrease the number of task done days
                    state.showStatus.completedDays--;
                }
            }
            // if passed status is null, set as pending habit
            else{
                // if already pending return
                if(state.showStatus.weekStatus[dayIndex] === null){
                    return;
                }
                // if the previous status was done
                else if(state.showStatus.weekStatus[dayIndex]){
                    // decrease the number of task done days
                    state.showStatus.completedDays--;
                }
            }
            
            // set the status of task as passed in the function
            state.showStatus.weekStatus[dayIndex] = status;
            // update the habits array { remove the old value of habit }
            const newHabits = state.habits.filter((habit) => habit.id !== state.showStatus.id);
            state.habits = newHabits;
            // append the changed status task in new habit list
            state.habits = [...state.habits, state.showStatus];
        }
    },
    
});


// export the habitReducer to create the store and accessing the state
export const habitReducer = habitSlice.reducer;

// exporting all the actions to use
export const { addHabit, setSuggestionSelected, 
                setShowStatus, toggleHabitStatus } = habitSlice.actions;


// exporting habitReducer's state to use state outside  
export const habitSelector = (state) => state.habitReducer;