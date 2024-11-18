import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Brand } from "../../interfaces/brands/brands";

interface brandsState {
  brands: Brand[];
  status: "idle" | "loading" | "succeeded" | "failed";
  page: number;
  filters: {
    paymentMethod: string;
  };
  error: string | null;
}

export const API_URL = "https://back-signa-1.onrender.com/api/brand/";

const initialState: brandsState = {
  brands: [],
  status: "idle",
  page: 1,
  filters: {
    paymentMethod: "",
  },
  error: null,
};

// Definir tipo para los datos del formulario
interface FormData {
  name: string;
  owner: string;
}

// Fetch de transacciones
export const fetchBrands = createAsyncThunk("brands/fetchbrands", async () => {
  const response = await fetch(`${API_URL}`);
  const data = await response.json();
  return data;
});

// Crear nueva marca
export const createBrand = createAsyncThunk(
  "brands/create",
  async (data: FormData) => {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
);

// Eliminar marca
export const deleteBrand = createAsyncThunk(
  "brands/delete",
  async (brandId: string) => {
    await fetch(`${API_URL}${brandId}/`, {
      method: "DELETE",
    });
    return brandId; // Devolver el ID para eliminarlo del estado
  }
);

// Actualizar marca
export const updateBrand = createAsyncThunk(
  "brands/update",
  async ({ id, data }: { id: string; data: FormData }) => {
    const response = await fetch(`${API_URL}${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
);

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.filters.paymentMethod = action.payload;
    },
    persistState: (state) => {
      localStorage.setItem("brandsState", JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchBrands.fulfilled,
        (state, action: PayloadAction<Brand[]>) => {
          state.status = "succeeded";
          state.brands = action.payload;
        }
      )
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch brands";
      })
      .addCase(createBrand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brands.push(action.payload);
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create brand";
      })
      .addCase(deleteBrand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brands = state.brands.filter(
          (brand: Brand) => brand.id !== action.payload
        );
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete brand";
      })
      .addCase(updateBrand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.brands.findIndex(
          (brand: Brand) => brand.id === action.payload.id
        );
        if (index !== -1) {
          state.brands[index] = action.payload;
        }
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update brand";
      });
  },
});

export const { setPage, setPaymentMethod, persistState } = brandsSlice.actions;

export default brandsSlice.reducer;
