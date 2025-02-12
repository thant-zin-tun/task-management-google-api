import { motion, Variants } from "framer-motion";

const defaultVariants: Variants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};

const AnimationContainerWithFramer = ({
  children,
  delay,
  variants = defaultVariants,
}: {
  children: React.ReactNode;
  delay: number;
  variants?: Variants;
}) => {
  return (
    <motion.div
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      initial="hidden"
      whileInView="visible"
      variants={variants}
      exit="hidden"
    >
      {children}
    </motion.div>
  );
};

export default AnimationContainerWithFramer;
