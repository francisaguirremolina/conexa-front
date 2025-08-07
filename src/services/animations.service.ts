// Reusable service for framer motion animations

interface AnimationProps {
  duration?: number;
  ease?: string;
  opacity?: number;
  scale?: number;
  delay?: number;
  delayExit?: number;
}

export const getFadeInProps = (props?: AnimationProps) => ({
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: props?.duration || 0.4,
      // @ts-ignore
      ease: props?.ease || 'easeInOut',
      delay: props?.delay || 0,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: props?.duration || 0.4,
      // @ts-ignore
      ease: props?.ease || 'easeInOut',
      delay: props?.delayExit || 0,
    },
  },
});
