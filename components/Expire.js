import { useEffect, useState } from "react";

function Expire({ children, order }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), (order - 1) * 2000);
    setTimeout(() => setVisible(false), order * 2000);
  }, [order]);
  return visible && <div className="expire">{children}</div>;
}

export default Expire;
