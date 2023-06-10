import { useState } from "react";
import { Input } from "../components/Input";
import styles from "../styles/RegistrarProducto.module.css";
import axios from "axios";
import { Toast } from "../components/Toast";

const initialState = {
  name: "",
  quantity: 0,
  information: "",
  start: "",
  expiration: "",
  picture: "",
};

export const RegisterProduct = () => {
  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "picture") {
      if (files && files.length > 0) {
        setForm({ ...form, picture: files[0] });
        setImage(URL.createObjectURL(files[0]));
      } else {
        setForm({ ...form, picture: "" });
        setImage("");
      }
    } else {
        setForm({ ...form, [name]: value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const validation = Object.keys(form).some((element) => !form[element]);

    if (validation) {
        Toast('info', 'Completar los campos')
    } else {
     
      const data = new FormData();

      for (const key in form) {
        data.append(key, form[key]);
      }

      axios.post("http://localhost:5000/api/product/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(res => {
        Toast('success', 'Producto agregado')
          setForm(initialState)
          setImage("")
      }).catch(err => {
        Toast('error', err.response.data.msg)
      });


    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <h2>Registrar Producto</h2>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            title="Nombre"
            type="text"
            name="name"
            onChange={handleChange}
            value={form.name}
          />
            <Input
            title="Cantidad"
            type="number"
            name="quantity"
            onChange={handleChange}
            value={form.quantity}
          />









          <Input
            title="Información"
            type="textarea"
            name="information"
            onChange={handleChange}
            value={form.information}
          />

          <Input
            title="Fecha de inicio de compra"
            type="date"
            name="start"
            onChange={handleChange}
            value={form.start}
          />
          <Input
            title="Fecha de vencimiento"
            type="date"
            name="expiration"
            onChange={handleChange}
            value={form.expiration}
          />

          <Input
            title="Imagen"
            type="file"
            name="picture"
            onChange={handleChange}
            
          />

          {image && (
            <div className={styles.picture}>
              <img src={image} alt="picture" />
            </div>
          )}

          <button className={styles.btn} type="submit">
            REGISTRAR
          </button>
        </form>
      </div>
    </div>
  );
};