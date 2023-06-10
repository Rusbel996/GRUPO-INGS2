import { useParams } from "react-router-dom";
import styles from "../styles/Detalles.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "../components/Toast";

export const Detalles = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  const dateValidation = (date) => {
    const now = new Date();
    const expiration = new Date(date);

    if (now >= expiration) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/product/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => Toast("error", err.response.data.msg));
  }, [id]);

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.datailsBox}>
        <h2>Detalles del producto</h2>
        <div className={styles.details}>
          <div className={styles.left}>
            <img src={product.picture?.url} alt={product.name} />
            <p>{product.name}</p>
            <div>
              {product.recommendation ? (
                <div>{product.recommendation}</div>
              ) : (
                <div>No hay recomendaciones</div>
              )}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.global}>
              <div className={styles.date}>
                <p>Fecha de compra</p>
                <p>{new Date(product.start).toLocaleDateString("en-AU")}</p>
              </div>
              <div className={styles.date}>
                <p>Fecha de vencimiento</p>
                <p>
                  {new Date(product.expiration).toLocaleDateString("en-AU")}
                </p>
              </div>
              <div
                className={
                  dateValidation(product.expiration) ? styles.exp : styles.noexp
                }
              >
                <p>Estado</p>
                <p>
                  {dateValidation(product.expiration)
                    ? "Vencido"
                    : "No vencido"}
                </p>
              </div>
            </div>
            <div className={styles.information}>
              <p>{product.information}</p>
            </div>
            <div className={styles.videos}>
              {product.videos?.length > 0 ? (
                <div className={styles.videobox}>
                  {product.videos.map((video, index) => (
                    <iframe
                    className={styles.video}
                    key={index}
                    src={video}
                    allowFullScreen
                  ></iframe>
                  ))}
                </div>
              ) : (
                <div>No hay videos</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};