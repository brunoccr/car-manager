// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" }, // Começa fora à esquerda
          "100%": { transform: "translateX(100%)" }, // Termina fora à direita
        },
      },
      animation: {
        shimmer: "shimmer 5s infinite linear", // Adicionei linear para o movimento ser constante
      },
    },
  },
};
