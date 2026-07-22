import { useEffect, useRef } from "react";

const useScrollToBottom = () => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  });

  return ref;
};

export default useScrollToBottom;
