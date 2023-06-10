import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "../components/Toast";
import { useParams } from "react-router-dom";
import { Input } from "../components/Input";
import styles from "../styles/Editar.module.css";

const initialState = {
  name: "",
  quantity: 0,
  information: "",
  start: "",
  expiration: "",
  picture: "",
  recommendation: "",
  videos: [""],
};

export const Editar = () => {
  const [product, setProduct] = useState(initialState);
  const { id } = useParams();

  const handleChange = (e, id) => {
    const { name, value } = e.target;

    if (name.includes("video")) {
      const values = [...product.videos];
      values[id] = value;
      setProduct({ ...product, videos: [...values] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleAdd = () => {
    const values = [...product.videos];
    values.push("");
    setProduct({ ...product, videos: [...values] });
  };

  const handleRemove = (i) => {
    const values = [...product.videos];
    values.splice(i, 1);
    setProduct({ ...product, videos: [...values] });
  }

  const onSubmit = () => {
    axios.patch(`http://localhost:5000/api/product/${id}`, product)
    .then(res => {
      Toast('success', 'Producto actualizado')
    }).catch(err => Toast("error", err.response.data.msg))
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/product/${id}`)
      .then((res) => {
        if(res.data.videos.length > 0 ){
          setProduct(res.data)
        }else{
          setProduct({...res.data, videos: [""]});
        }
        
      })
      .catch((err) => Toast("error", err.response.data.msg));
  }, [id]);

  return (
    <div className={styles.editContainer}>
      <h2>Editar Producto</h2>
      <div className={styles.edit}>
        <div className={styles.left}>
          <img src={product.picture?.url} alt={product.name} />
        </div>
        <div className={styles.right}>
          <Input
            title="Nombre"
            type="text"
            name="name"
            value={product.name}
            readOnly={true}
          />
            <Input
            title="Cantidad"
            type="number"
            name="quantity"
            value={product.quantity}
            readOnly={true}
          /> 






          <Input
            title="Información"
            type="textarea"
            name="information"
            value={product.information}
            readOnly={true}
          />

          <div className={styles.flex}>
            <Input
              title="Fecha de inicio de compra"
              type="text"
              name="start"
              value={new Date(product.start).toLocaleDateString("en-AU")}
              readOnly={true}
            />

            <Input
              title="Fecha de vencimiento"
              type="text"
              name="expiration"
              value={new Date(product.expiration).toLocaleDateString("en-AU")}
              readOnly={true}
            />
          </div>

          <Input
            title="Recomendaciones"
            type="textarea"
            name="recommendation"
            value={product.recommendation}
            onChange={handleChange}
          />

          <div className={styles.manyInputs}>
            {product.videos.map((field, index) => (
              <Input
                key={index}
                type="text"
                title={`Video ${index + 1}`}
                name={`video ${index + 1}`}
                value={field || ""}
                icon={product.videos.length > 1 && <span>X</span>}
                onClick={() => handleRemove(index)}
                onChange={(e) => handleChange(e, index)}
              />
            ))}

            <div
              className={styles.manyBtn}
              onClick={handleAdd}
            >
              Agregar video
            </div>
          </div>

          <button onClick={onSubmit} className={styles.btn}>Actualizar</button>
        </div>
      </div>
    </div>
  );
};