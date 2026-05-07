# VeryCheck

Verificador de hechos experimental con IA, construido con React, Vite, TypeScript, Tailwind y Gemini.

![Status](https://img.shields.io/badge/status-beta-blue)
![Stack](https://img.shields.io/badge/stack-React%20%7C%20Vite%20%7C%20TypeScript%20%7C%20Tailwind-orange)
![AI](https://img.shields.io/badge/AI-Gemini-brightgreen)

## Demo

[verycheck-676062574925.us-west1.run.app](https://verycheck-676062574925.us-west1.run.app/)

## Proposito

VeryCheck analiza afirmaciones o textos noticiosos y devuelve una evaluacion estructurada con explicacion y fuentes. Es un proyecto personal de Damian Gomez para explorar herramientas de verificacion asistida por IA.

El sistema genera, para cada afirmacion:

- Veredicto: `verdadero`, `falso`, `enganoso` o `indeterminado`.
- Confianza estimada.
- Explicacion breve.
- Fuentes citadas cuando estan disponibles.

## Estado del proyecto

Beta experimental. Sirve como prototipo educativo y como pieza de portfolio; no reemplaza el trabajo de periodistas, verificadores profesionales ni fuentes oficiales.

## Stack

- React + Vite
- TypeScript
- Tailwind CSS
- Gemini API
- Google Cloud Run

## Uso local

```bash
npm install
npm run dev
```

Para usar la integracion con Gemini, configura la clave de API segun las variables de entorno esperadas por el proyecto. No publiques archivos `.env` ni claves privadas.
