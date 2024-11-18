import { motion } from "framer-motion";
import { CloseIcon } from "../components/body/icons";

interface IProps {
  setIsShowGallery: (isShowGallery: boolean) => void,
  setIsShowLoading: (isShowLoading: boolean) => void
}

function ImageLoadingAnimation(props: IProps) {
  const {setIsShowGallery, setIsShowLoading } = props

  const resumeLoading = () => {
    setIsShowLoading(false)
    setIsShowGallery(false)
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        left: "0",
        top: "0",
        margin: "0",
        padding: "0",
        backgroundColor: "black",
        zIndex: 100000,
        overflow: "hidden",
        alignContent: "center",
        opacity: 0.9,
        paddingTop: '20vh'
      }}
    >
      <p
        style={{
          width: "40px",
          margin: "0",
          marginTop: "3px",
          position: "absolute",
          left: "20px",
          top: "20px",
          cursor: "pointer",
          zIndex: 10000,
        }}
        onClick={resumeLoading}
      >
        <CloseIcon className="w-6 lg:w-10" />
      </p>
      <div className="flex justify-center items-center h-16">
        <motion.div
          className="w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

export default ImageLoadingAnimation;
