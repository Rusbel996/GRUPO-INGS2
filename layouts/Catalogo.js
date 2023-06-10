import { useEffect, useState } from "react";
import styles from "../styles/Catalogo.module.css";
import axios from "axios";
import { Toast } from "../components/Toast";
import { Link } from "react-router-dom";

export const Catalogo= () => {
  const [products, setProducts] = useState([]);

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
      .get("http://localhost:5000/api/product/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => Toast("error", err.response.data.msg));
  }, []);

  return (
    <div className={styles.viewContainer}>
      <div className={styles.viewBox}>
        <h2>Catálogo de productos</h2>
        <div className={styles.list}>
          {products.map((element) => (
            <div key={element._id} className={styles.item}>
              <Link to={`/detalles/${element._id}`}><img src={element.picture.url} alt={element.name} /></Link>
              <p>{element.name}</p>
              <div
                className={
                  dateValidation(element.expiration) ? styles.exp : styles.noexp
                }
              >
                {dateValidation(element.expiration) ? "Vencido" : "No vencido"}
              </div>
              <Link className={styles.edit} to={`/${element._id}`}>Editar</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};