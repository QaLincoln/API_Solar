const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    "apiUrl": "https://bff-dev-ri-0-app-solar-dev.apps.opshml.solarbr.com.br",
      "cpfOrCnpj": "93639644930",
      "password": "Senha@123",
      "AUTH_TOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgxNTQzLCJjbGllbnRDb2RlIjpudWxsLCJyb2xlcyI6WyJBdXRoZW50aWNhdG9yIl0sImlhdCI6MTcyNDk1MTAxOSwiZXhwIjoxNzI3NTQzMDE5fQ.DaFXkVHb8LMPcEmes7czS74uctzOs4XlrtXYQm0Vm0M",
      "token_clients": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc2NTQsImNsaWVudENvZGUiOiIwMDA2NDQ1OTMzIiwicm9sZXMiOlsiQXV0aGVudGljYXRlZCJdLCJpYXQiOjE3MzAxNDA3MjUsImV4cCI6MTc2MTY5ODMyNX0.8-lCXcALrWtO0yXzVRqGPXGuoccmjKiAIMg16QanYPc"
    },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
