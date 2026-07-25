# VeryCheck

Verificador de hechos experimental con IA, construido con React, Vite, TypeScript, Tailwind y Gemini.

![Status](https://img.shields.io/badge/status-beta-blue)
![Stack](https://img.shields.io/badge/stack-React%20%7C%20Vite%20%7C%20TypeScript%20%7C%20Tailwind-orange)
![AI](https://img.shields.io/badge/AI-Gemini-brightgreen)

**Demo publica:** [hefestion1989.github.io/VeryCheck](https://hefestion1989.github.io/VeryCheck/)

## Proposito

VeryCheck analiza afirmaciones o textos noticiosos y devuelve una evaluacion estructurada con explicacion, nivel de confianza y fuentes cuando estan disponibles.

Es un proyecto personal de Damian Gomez para explorar herramientas de verificacion asistida por IA, alfabetizacion informacional y lectura critica de contenidos.

## Que devuelve

Para cada afirmacion, el sistema busca producir:

- Veredicto: `verdadero`, `falso`, `enganoso` o `indeterminado`.
- Confianza estimada.
- Explicacion breve del razonamiento.
- Fuentes citadas cuando estan disponibles.
- Busqueda de Google integrada mediante Gemini para contrastar informacion actual.

## Estado del proyecto

Beta experimental. Sirve como prototipo educativo y pieza de portfolio; no reemplaza el trabajo de periodistas, verificadores profesionales ni fuentes oficiales.

La demo se publica automaticamente en GitHub Pages desde la rama `main`. Para realizar consultas, cada visitante ingresa su propia API key de Gemini.

El repositorio debe usar **Settings > Pages > Source: GitHub Actions**. A partir de ahi, cada cambio integrado en `main` se valida y despliega mediante el workflow incluido.

## Stack

- React + Vite
- TypeScript
- Tailwind CSS
- Gemini API
- GitHub Pages

## Uso local

```bash
npm install
npm run dev
```

Para validar una modificacion antes de publicarla:

```bash
npm run check
```

Al abrir la aplicacion, pega una API key de Gemini en el campo correspondiente. La clave se conserva solo en memoria mientras la pestana esta abierta: no se guarda en el repositorio, en un archivo `.env` ni en el almacenamiento del navegador.

Como cualquier aplicacion web cliente, el navegador envia esa clave directamente a la API de Google. Para una publicacion con una clave administrada por el proyecto se necesita un backend que mantenga el secreto fuera del navegador.

## Relacion con el portfolio

VeryCheck es uno de los proyectos principales del portfolio publico. El mapa general esta en [`portfolio-proyectos`](https://github.com/Hefestion1989/portfolio-proyectos).
