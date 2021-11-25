import style from "../styles/PortfolioDisplay.module.css";

function PortfolioDisplay() {
  return (
    <div className={style.summary}>
      <div className={style.mainView}>Main View</div>
      <div className={style.list}>
        <h2 className="side-list__header">Header</h2>
        <div className="side-list__item">Item</div>
        <div className="side-list__item">Item</div>
        <div className="side-list__item">Item</div>
        <div className="side-list__item">Item</div>
      </div>
    </div>
  );
}

export default PortfolioDisplay;
