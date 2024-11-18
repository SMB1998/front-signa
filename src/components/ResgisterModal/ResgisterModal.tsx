import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  createBrand,
  fetchBrands,
  updateBrand,
} from "../../store/slices/brandSlice";
import { AppDispatch } from "../../store/store";
import { CheckCircle } from "@mui/icons-material";
import { Brand } from "../../interfaces/brands/brands";

interface RegisterModalProps {
  open?: boolean;
  onClose: () => void;
  brand?: Brand;
}

const steps = ["Información de la Marca", "Cédula del Titular", "Resumen"];

export const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  onClose,
  brand,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", owner: "" });

  useEffect(() => {
    if (brand) {
      setFormData({ name: brand.name, owner: brand.owner });
    }
  }, [brand]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFinalSubmit = () => {
    if (brand?.id) {
      dispatch(updateBrand({ id: brand.id, data: formData })).then(() =>
        dispatch(fetchBrands())
      );
    } else {
      dispatch(createBrand(formData)).then(() => dispatch(fetchBrands()));
    }
    onClose();
  };

  return (
    <Dialog open={!!open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Wizard de Registro</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div>
          {activeStep === 0 && (
            <div>
              <TextField
                label="Marca"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                helperText="Puedes dejar este campo vacío"
              />
            </div>
          )}

          {activeStep === 1 && (
            <div>
              <TextField
                label="Cédula del Titular"
                name="owner"
                value={formData.owner}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                helperText="Por favor ingresa la cédula del titular"
              />
            </div>
          )}

          {activeStep === 2 && (
            <div>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                <CheckCircle color="primary" fontSize="large" /> Resumen de la
                Información
              </Typography>
              <Card sx={{ boxShadow: 3, marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="body1">
                    <strong>Marca:</strong>{" "}
                    {formData.name || "(No especificada)"}
                  </Typography>
                  <Divider sx={{ marginY: 2 }} />
                  <Typography variant="body1">
                    <strong>Cédula del Titular:</strong>{" "}
                    {formData.owner || "(No especificada)"}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>

      <DialogActions>
        {activeStep > 0 && (
          <Button onClick={handleBack} color="secondary">
            Atrás
          </Button>
        )}
        {activeStep === steps.length - 1 ? (
          <Button
            onClick={handleFinalSubmit}
            color="primary"
            disabled={!formData?.name && !formData?.owner}
          >
            Enviar
          </Button>
        ) : (
          <Button onClick={handleNext} color="primary">
            Siguiente
          </Button>
        )}
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterModal;
