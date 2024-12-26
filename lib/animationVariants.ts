// animationVariants.ts
import { animate, Variants } from "framer-motion";

export const fadeInUp: Variants = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: (delay = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      delay,
      ease: "easeOut",
    },
  }),
};

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: (delay = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay,
    },
  }),
};

export const scaleIn: Variants = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: (delay = 0) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay,
    },
  }),
};

export const slideInFromLeft: Variants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: (delay = 0) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut",
    },
  }),
};

export const slideInFromRight: Variants = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: (delay = 0) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut",
    },
  }),
};

export const slideInFromTop: Variants = {
  initial: {
    y: -100,
    opacity: 0,
  },
  animate: (delay = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut",
    },
  }),
};

export const slideInFromBottom: Variants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: (delay = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut",
    },
  }),
};

export const rotateIn: Variants = {
  initial: {
    rotate: -90,
    opacity: 0,
  },
  animate: (delay = 0) => ({
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut",
    },
  }),
};

export const bounceIn: Variants = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: (delay = 0) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay,
    },
  }),
};

export const staggerContainer: Variants = {
  initial: {},
  animate: (delay = 0) => ({
    transition: {
      staggerChildren: 0.1,
      delayChildren: delay,
    },
  }),
};

export const motionAttributes = { initial: "initial", animate: "animate" };
