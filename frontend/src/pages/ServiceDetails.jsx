import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Paper,
  InputAdornment,
  Alert,
  AlertTitle,
} from "@mui/material";
import {
  Code as CodeIcon,
  Brush as BrushIcon,
  DesignServices as DesignServicesIcon,
  BrandingWatermark as BrandingWatermarkIcon,
  Email as EmailIcon,
  WhatsApp as WhatsAppIcon,
  Business as BusinessIcon,
  Payments as PaymentsIcon,
  InfoOutlined as InfoIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

export default function ServicePurchase() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // 1. Stepper Steps
  const steps = [
    "Form Fill",
    "Submission",
    "Contact",
    "Requirements",
    "Delivery",
  ];

  // 2. Service Options
  const services = [
    {
      name: "Custom Web Development",
      icon: <CodeIcon />,
      desc: "Scalable coding solutions",
    },
    {
      name: "UI / UX Design",
      icon: <BrushIcon />,
      desc: "User-centered interfaces",
    },
    {
      name: "Figma Design",
      icon: <DesignServicesIcon />,
      desc: "Prototyping & wireframes",
    },
    {
      name: "Logo Design",
      icon: <BrandingWatermarkIcon />,
      desc: "Brand identity assets",
    },
  ];

  // 3. State Management
  const [formData, setFormData] = useState({
    business_name: "",
    website_type: "",
    details: "",
    budget: "",
    email: "",
    whatsapp: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceSelect = (serviceName) => {
    setFormData({ ...formData, website_type: serviceName });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tailwind Form Data:", formData);
  };

  return (
    <section
      className={`py-16 md:py-24 px-4 min-h-screen transition-colors duration-500 ${
        isDarkMode ? "bg-[#051622]" : "bg-slate-50"
      }`}
    >
      <Container maxWidth="lg">
        {/* STEPPER SECTION */}
        <Box className="mb-16 overflow-x-auto pb-4">
          <Stepper activeStep={0} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    style: {
                      color: label === "Form Fill" ? "#00BF56" : "#64748b",
                    },
                  }}
                >
                  <span
                    className={
                      isDarkMode
                        ? "text-slate-400 font-bold"
                        : "text-slate-600 font-bold"
                    }
                  >
                    {label}
                  </span>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-black italic tracking-tighter mb-4 ${
              isDarkMode ? "text-white" : "text-[#0B3C5D]"
            }`}
          >
            Work With Our <span className="text-[#00BF56]">Experts</span>
          </motion.h1>
          <p
            className={`text-lg max-w-2xl mx-auto opacity-80 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            Provide your business details below to initiate the professional
            design process.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: SERVICE SELECTION (4 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <Typography
              variant="h5"
              className={`font-black mb-6 ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
            >
              1. Select Service
            </Typography>

            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={index}
                  onClick={() => handleServiceSelect(service.name)}
                  className={`flex items-center gap-4 p-5 rounded-[1.5rem] cursor-pointer border-2 transition-all duration-300 ${
                    formData.website_type === service.name
                      ? "border-[#00BF56] bg-[#00BF56]/10 shadow-lg shadow-[#00BF56]/20"
                      : isDarkMode
                        ? "border-white/5 bg-white/5"
                        : "border-slate-200 bg-white"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl ${
                      formData.website_type === service.name
                        ? "bg-[#00BF56] text-white"
                        : "bg-slate-500/10 text-slate-400"
                    }`}
                  >
                    {service.icon}
                  </div>
                  <div>
                    <h4
                      className={`font-black text-lg ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
                    >
                      {service.name}
                    </h4>
                    <p className="text-sm opacity-60 font-medium">
                      {service.desc}
                    </p>
                  </div>
                  {formData.website_type === service.name && (
                    <CheckIcon className="ml-auto text-[#00BF56]" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: FORM SECTION (7 Columns) */}
          <Paper
            elevation={0}
            className={`lg:col-span-7 p-8 md:p-12 rounded-[2.5rem] border ${
              isDarkMode
                ? "bg-[#0a2538] border-white/10"
                : "bg-white border-slate-100 shadow-2xl shadow-slate-200/50"
            }`}
          >
            <Typography
              variant="h5"
              className={`font-black mb-8 ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
            >
              2. Business Details
            </Typography>

            <form onSubmit={handleSubmit} className="space-y-4">
              <TextField
                label="Business Name"
                name="business_name"
                fullWidth
                required
                value={formData.business_name}
                onChange={handleInputChange}
                variant="filled"
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon className="text-[#00BF56]" />
                    </InputAdornment>
                  ),
                  className: `rounded-2xl ${isDarkMode ? "bg-white/5 text-white" : "bg-slate-50"}`,
                }}
                InputLabelProps={{
                  className: isDarkMode ? "text-slate-400" : "text-slate-500",
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="filled"
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon className="text-[#00BF56]" />
                      </InputAdornment>
                    ),
                    className: `rounded-2xl ${isDarkMode ? "bg-white/5 text-white" : "bg-slate-50"}`,
                  }}
                />
                <TextField
                  label="WhatsApp Number"
                  name="whatsapp"
                  fullWidth
                  required
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  variant="filled"
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <WhatsAppIcon className="text-[#00BF56]" />
                      </InputAdornment>
                    ),
                    className: `rounded-2xl ${isDarkMode ? "bg-white/5 text-white" : "bg-slate-50"}`,
                  }}
                />
              </div>

              <TextField
                label="Estimated Budget"
                name="budget"
                fullWidth
                required
                value={formData.budget}
                onChange={handleInputChange}
                variant="filled"
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PaymentsIcon className="text-[#00BF56]" />
                    </InputAdornment>
                  ),
                  className: `rounded-2xl ${isDarkMode ? "bg-white/5 text-white" : "bg-slate-50"}`,
                }}
              />

              <TextField
                label="Project Requirements"
                name="details"
                multiline
                rows={4}
                fullWidth
                required
                placeholder="Describe your vision..."
                value={formData.details}
                onChange={handleInputChange}
                variant="filled"
                InputProps={{
                  disableUnderline: true,
                  className: `rounded-2xl ${isDarkMode ? "bg-white/5 text-white" : "bg-slate-50"}`,
                }}
              />

              <Alert
                severity="warning"
                className="rounded-2xl border border-amber-500/20 bg-amber-500/5 items-center"
                icon={<InfoIcon className="text-amber-500" />}
              >
                <AlertTitle className="font-black">Important Note</AlertTitle>
                Our lead designer will reach out via{" "}
                <strong className="text-amber-600">WhatsApp</strong> to discuss
                technical details.
              </Alert>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!formData.website_type}
                  className={`py-4 rounded-2xl font-black text-lg transition-all duration-300 shadow-xl ${
                    formData.website_type
                      ? "bg-[#00BF56] hover:bg-[#00a84b] shadow-[#00BF56]/30"
                      : "bg-slate-400"
                  }`}
                  sx={{ textTransform: "none", border: "none" }}
                >
                  {formData.website_type
                    ? `Request ${formData.website_type}`
                    : "Choose a Service First"}
                </Button>
              </motion.div>
            </form>
          </Paper>
        </div>
      </Container>
    </section>
  );
}
