import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Actions asynchrones
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
    const response = await axios.get('http://localhost:3000/api/events');
    return response.data.events;
});

export const addEvent = createAsyncThunk('events/addEvent', async (event) => {
    const token = localStorage.getItem('user_token');  // ou un autre endroit où vous stockez le token

    const response = await axios.post('http://localhost:3000/api/events', event, {
        headers: {
            Authorization: `Bearer ${token}`  // Ajoutez le token dans les en-têtes
        }
    });;
    return response.data;
});

export const removeEvent = createAsyncThunk('events/removeEvent', async (eventId) => {
    await axios.delete(`/api/events/${eventId}`);
    return eventId;
});

export const updateEvent = createAsyncThunk('events/updateEvent', async (event) => {
    const response = await axios.put(`/api/events/${event.id}`, event);
    return response.data;
});

export const enrollEvent = createAsyncThunk(
    'events/enrollEvent',
    async ({ eventId, userId }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`http://localhost:3000/api/events/${eventId}/adduser`, { userId });
        return response.data;
      } catch (error) {
        console.error('Erreur API :', error.response?.data || error.message);
        return rejectWithValue(error.response?.data || 'Erreur inconnue');
      }
    }
  );

  export const getUserEvents = createAsyncThunk('events/getUserEvents', async () => {
    // Récupérez le token depuis le localStorage ou le state de votre application
    const token = localStorage.getItem('user_token');  // ou un autre endroit où vous stockez le token

    const response = await axios.get('http://localhost:3000/api/users/events', {
        headers: {
            Authorization: `Bearer ${token}`  // Ajoutez le token dans les en-têtes
        }
    });
    return response.data.events;
});
  
const eventSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
        userEvents: [], // Add this line
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addEvent.fulfilled, (state, action) => {
                state.events.push(action.payload);
            })
            .addCase(removeEvent.fulfilled, (state, action) => {
                state.events = state.events.filter(event => event.id !== action.payload);
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                const index = state.events.findIndex(event => event.id === action.payload.id);
                if (index !== -1) {
                    state.events[index] = action.payload;
                }
            })
            .addCase(enrollEvent.fulfilled, (state, action) => {
                const index = state.events.findIndex(event => event.id === action.payload.id);
                if (index !== -1) {
                    state.events[index] = action.payload;
                }
            })
            .addCase(getUserEvents.fulfilled, (state, action) => {
                state.userEvents = action.payload;
            });
    }
});

export default eventSlice.reducer;
