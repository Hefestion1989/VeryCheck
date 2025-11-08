# VeryCheck 🔍  
_Verificador de hechos con IA (Gemini + React)_

![Status](https://img.shields.io/badge/status-beta-blue)
![Stack](https://img.shields.io/badge/stack-React%20%7C%20Vite%20%7C%20TypeScript%20%7C%20Tailwind-orange)
![AI](https://img.shields.io/badge/AI-Gemini%201.5%20Pro-9cf)
![Deploy](https://img.shields.io/badge/Cloud-Google%20Run-brightgreen)

---

## 🚀 Demo en vivo

👉 [https://verycheck-676062574925.us-west1.run.app/](https://verycheck-676062574925.us-west1.run.app/)

---

## 🧠 Descripción

**VeryCheck** es una aplicación experimental de verificación de hechos (“fact-checking”) desarrollada por **Damián Gómez** como proyecto personal.  
Utiliza la API de **Google Gemini 1.5 Pro** para analizar afirmaciones o textos noticiosos y devolver un veredicto con evidencia verificable.

El sistema genera, para cada afirmación:

- Un **veredicto**: `verdadero | falso | engañoso | indeterminado`
- Un nivel de **confianza** (0–1)
- Una **explicación breve**
- Una lista de **fuentes citadas** (URLs verificables)

> 🧪 Esta app es un prototipo educativo y no reemplaza el trabajo de periodistas o verificadores profesionales.

---

## 🖼️ Captura

> Agregá un archivo `screenshot.png` aquí en la raíz del repo y GitHub mostrará la vista previa automáticamente.

```markdown
![VeryCheck screenshot](./screenshot.png)
