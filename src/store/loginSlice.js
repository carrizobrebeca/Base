
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const jwt = require('jsonwebtoken');

export const fetchLogin = createAsyncThunk(
  'login/fetchLogin',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:3001/login`, userData);
      // respuesta con usuario y token
      return response.data; // { user: {...}, token: "xxx" }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error de autenticación');
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
        alert('Inicio de sesión exitoso');
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Usuario o contraseña incorrecta';
        alert('Usuario o contraseña incorrecta');
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// const jwt = require('jsonwebtoken');

// // Función para manejar el inicio de sesión
// export const fetchLogin = createAsyncThunk('login/fetchLogin', async (userData, { rejectWithValue }) => {
//   try {
//     const response = await axios.post(`http://localhost:3001/login`, userData);
//     return response.data.user; // Asegúrate de que esto devuelva el usuario correctamente
//   } catch (error) {
//     // Manejo de errores: Devuelve el error del servidor si la autenticación falla
//     return rejectWithValue(error.response?.data || 'Error de autenticación');
//   }
// });

// const loginSlice = createSlice({
//   name: 'login',
//   initialState: {
//     user: JSON.parse(localStorage.getItem('user')) || null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.status = 'succeeded';
//       state.user = action.payload; // Aquí debería venir el usuario con el `usuario_id`
//     },
//     logout: (state) => {
//       state.user = null;
//       state.status = 'idle';
//       state.error = null;
//       localStorage.removeItem('user');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLogin.pending, (state) => {
//         state.status = 'loading';
//         state.error = null; // Limpiar errores previos
//       })
//       .addCase(fetchLogin.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//         localStorage.setItem('user', JSON.stringify(state.user));
//         // Puedes manejar la navegación aquí si es necesario
//         alert(`Inicio de sesión exitosame`);
//       })
//       .addCase(fetchLogin.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload || 'Usuario o contraseña incorrecta'; // Usar mensaje de error más específico
//         alert(`Usuario o contraseña incorrecta`);
//       });
//   },
// });

// export const { logout } = loginSlice.actions;
// export default loginSlice.reducer;