import {motion,AnimatePresence} from "framer-motion";
import { div } from "framer-motion/client";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(()=>{
    setTimeout(()=>{
      setIsVisible(false)
    },3000)
  },[])
  return (
    
    <>
    <div className="">

    <motion.div
  initial="hidden"
  whileInView="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.5
      }
    }
  }}
  viewport={{ once: true }}
>
  {["One", "Two", "Three"].map((text, i) => (
    <motion.p
      key={i}
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {text}
    </motion.p>
  ))}
</motion.div>



    </div>
    
    </>


  
  );
}

export default HomePage;